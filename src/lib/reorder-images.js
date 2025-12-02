/**
 * Script to reorder product variant images so model photos (-main.jpg) come first
 *
 * Run this with: node scripts/reorder-images.js
 */

import {createClient} from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing environment variables')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function reorderImages() {
    console.log('🔄 Fetching all product variants...')

    const { data: variants, error } = await supabase
        .from('product_variants')
        .select('*')

    if (error) {
        console.error('❌ Error fetching variants:', error)
        return
    }

    console.log(`📦 Found ${variants.length} variants to process`)

    let updated = 0
    let skipped = 0

    for (const variant of variants) {
        if (!variant.images || !Array.isArray(variant.images) || variant.images.length === 0) {
            skipped++
            continue
        }

        // Find the model image (ends with -main.jpg)
        const modelImageIndex = variant.images.findIndex(img =>
            typeof img === 'string' && img.includes('-main.jpg')
        )

        // If model image exists and is not already first
        if (modelImageIndex > 0) {
            const reorderedImages = [...variant.images]
            const modelImage = reorderedImages.splice(modelImageIndex, 1)[0]
            reorderedImages.unshift(modelImage)

            // Update the database
            const { error: updateError } = await supabase
                .from('product_variants')
                .update({
                    images: reorderedImages,
                    updated_at: new Date().toISOString()
                })
                .eq('id', variant.id)

            if (updateError) {
                console.error(`❌ Error updating variant ${variant.sku}:`, updateError)
            } else {
                console.log(`✅ Updated ${variant.sku}: Moved model image to position 0`)
                updated++
            }
        } else if (modelImageIndex === 0) {
            console.log(`⏭️  ${variant.sku}: Model image already first`)
            skipped++
        } else {
            console.log(`⚠️  ${variant.sku}: No model image found`)
            skipped++
        }
    }

    console.log('\n📊 Summary:')
    console.log(`   Updated: ${updated}`)
    console.log(`   Skipped: ${skipped}`)
    console.log(`   Total: ${variants.length}`)
}

reorderImages()
    .then(() => {
        console.log('\n✨ Image reordering complete!')
        process.exit(0)
    })
    .catch(err => {
        console.error('💥 Fatal error:', err)
        process.exit(1)
    })
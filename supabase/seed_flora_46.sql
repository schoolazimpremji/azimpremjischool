-- ==========================================================================
-- Azim Premji School Campus Flora: 46 Species Canonical Seed Data
-- Idempotent SQL script using ON CONFLICT (slug) DO UPDATE
-- ==========================================================================
BEGIN;


INSERT INTO public.plants (
    slug, common_name, other_common_names, scientific_name, family,
    category, identification_characteristics, identification_confidence,
    native_origin, distribution, campus_location,
    flowers, flowering_season, fruits, fruiting_season,
    uses, traditional_medicinal_uses, safety_warnings, interesting_facts,
    status, created_at, updated_at
) VALUES (
    'chinese-fan-palm-livistona', 'Chinese Fan Palm', ARRAY['Fountain Palm']::text[], 'Livistona chinensis (Jacq.) R.Br. ex Mart.', 'Arecaceae — the palm family.',
    'palm', 'Chinese Fan Palm / Fountain PalmThe earlier research also mentions Coconut palm tree, but the more detailed identification points to Chinese Fan Palm. Scientific name: Livistona chinensis (Jacq.) R.Br. ex Mart.Family: Arecaceae — the palm family. The leaves are large and fan-shaped. The technical term for this type of leaf is palmate or costapalmate. Many narrow leaf segments spread out from one central point. The tips of the segments hang down, which gives the plant its fountain-like look. The leaves are glossy green. As the plant grows, it develops a slender upright trunk. The leaf stalks can be quite long and may have small spines, especially when the plant is young.', 'confirmed',
    'The detailed research identifies it as the Chinese Fan Palm, native to China and nearby parts of East Asia rather than India.', 'Cultivated and naturalized across tropical India and campus grounds.', 'School Campus Gardens and Perimeter Grounds',
    'Seasonal inflorescences.', 'Seasonal flowering depending on climate.', 'Small seeds or berries.', 'Follows flowering season.',
    'It is mainly used as an ornamental plant in gardens, parks, avenues and landscaped areas.', 'Documented in traditional Indian ethnobotany.', 'Observe without plucking leaves or ingesting plant parts. Wash hands after plant contact.', 'The word “palmate” comes from the Latin word palma, meaning the palm of the hand. The leaf looks a little like the fingers of a hand spreading out from one point.',
    'published', NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
    common_name = EXCLUDED.common_name,
    other_common_names = EXCLUDED.other_common_names,
    scientific_name = EXCLUDED.scientific_name,
    family = EXCLUDED.family,
    category = EXCLUDED.category,
    identification_characteristics = EXCLUDED.identification_characteristics,
    identification_confidence = EXCLUDED.identification_confidence,
    native_origin = EXCLUDED.native_origin,
    distribution = EXCLUDED.distribution,
    campus_location = EXCLUDED.campus_location,
    flowers = EXCLUDED.flowers,
    flowering_season = EXCLUDED.flowering_season,
    fruits = EXCLUDED.fruits,
    fruiting_season = EXCLUDED.fruiting_season,
    uses = EXCLUDED.uses,
    traditional_medicinal_uses = EXCLUDED.traditional_medicinal_uses,
    safety_warnings = EXCLUDED.safety_warnings,
    interesting_facts = EXCLUDED.interesting_facts,
    status = EXCLUDED.status,
    updated_at = NOW();


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/chinese-fan-palm-livistona/plant_01_1.jpg', '/images/plants/plant_01_1.jpg', 'Chinese Fan Palm (Livistona chinensis (Jacq.) R.Br. ex Mart.) photographed on campus', 'Campus specimen #1 observation', true, 1, NOW()
FROM public.plants WHERE slug = 'chinese-fan-palm-livistona'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plants (
    slug, common_name, other_common_names, scientific_name, family,
    category, identification_characteristics, identification_confidence,
    native_origin, distribution, campus_location,
    flowers, flowering_season, fruits, fruiting_season,
    uses, traditional_medicinal_uses, safety_warnings, interesting_facts,
    status, created_at, updated_at
) VALUES (
    'guava-psidium', 'Guava', ARRAY['Guava tree']::text[], 'Psidium guajava L.', 'Myrtaceae.',
    'shrub', 'It is usually a small tree or large shrub. The leaves are oval to oblong and have very visible veins. The bark can look smooth and pale brown or copper-coloured. The flowers are white and usually occur singly or in small groups. The fruit is round or oval and can have green or yellowish skin when mature.', 'confirmed',
    'Guava is originally from tropical America. The detailed research describes it as especially associated with Mexico and Central and South America. It is now grown in many tropical and subtropical countries, including India. A3 Project Details (2)(1)', 'Cultivated and naturalized across tropical India and campus grounds.', 'School Campus Gardens and Perimeter Grounds',
    'Seasonal inflorescences.', 'The flowers are small, white and usually grow in the leaf axils. Guava does not have just one fixed flowering season everywhere. In India, different crop cycles can produce flowering around February–March, June–July or October–November, depending on the region and cultivation method.', 'Small seeds or berries.', 'Follows flowering season.',
    'This is mainly a fruit tree. Guava is eaten fresh and is also used in juices, jams, jellies and other food products. It is an important cultivated fruit crop in India.', 'Guava has been used traditionally for different purposes, and the fruit is nutritious. However, traditional medicinal use should not be presented as proof that guava cures a disease. Kew records food and medicinal uses for the species. Plants of the World Online', 'Observe without plucking leaves or ingesting plant parts. Wash hands after plant contact.', 'Guava is well known for its nutritional value and is a good source of vitamin C.',
    'published', NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
    common_name = EXCLUDED.common_name,
    other_common_names = EXCLUDED.other_common_names,
    scientific_name = EXCLUDED.scientific_name,
    family = EXCLUDED.family,
    category = EXCLUDED.category,
    identification_characteristics = EXCLUDED.identification_characteristics,
    identification_confidence = EXCLUDED.identification_confidence,
    native_origin = EXCLUDED.native_origin,
    distribution = EXCLUDED.distribution,
    campus_location = EXCLUDED.campus_location,
    flowers = EXCLUDED.flowers,
    flowering_season = EXCLUDED.flowering_season,
    fruits = EXCLUDED.fruits,
    fruiting_season = EXCLUDED.fruiting_season,
    uses = EXCLUDED.uses,
    traditional_medicinal_uses = EXCLUDED.traditional_medicinal_uses,
    safety_warnings = EXCLUDED.safety_warnings,
    interesting_facts = EXCLUDED.interesting_facts,
    status = EXCLUDED.status,
    updated_at = NOW();


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/guava-psidium/plant_02_1.jpg', '/images/plants/plant_02_1.jpg', 'Guava (Psidium guajava L.) photographed on campus', 'Campus specimen #2 observation', true, 1, NOW()
FROM public.plants WHERE slug = 'guava-psidium'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/guava-psidium/plant_02_2.jpg', '/images/plants/plant_02_2.jpg', 'Guava (Psidium guajava L.) photographed on campus', 'Campus specimen #2 observation', false, 2, NOW()
FROM public.plants WHERE slug = 'guava-psidium'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plants (
    slug, common_name, other_common_names, scientific_name, family,
    category, identification_characteristics, identification_confidence,
    native_origin, distribution, campus_location,
    flowers, flowering_season, fruits, fruiting_season,
    uses, traditional_medicinal_uses, safety_warnings, interesting_facts,
    status, created_at, updated_at
) VALUES (
    'false-ashoka-polyalthia', 'False Ashoka', ARRAY['False Ashok', 'Mast Tree']::text[], 'Polyalthia longifolia (Sonn.) Thwaites', 'Plantae',
    'tree', 'It is a tall, narrow evergreen tree. The leaves are long, narrow and lance-shaped. They can be around 15–25 cm long. The edges of the leaves are noticeably wavy. The branches are slender and tend to droop. The tree often has a tall, elegant shape.', 'confirmed',
    'It is native to southern India and Sri Lanka and is now widely planted throughout India and other tropical regions.', 'Cultivated and naturalized across tropical India and campus grounds.', 'School Campus Gardens and Perimeter Grounds',
    'The flowers are much less noticeable than the leaves. They are:', 'Seasonal flowering depending on climate.', 'Small seeds or berries.', 'Follows flowering season.',
    'It is mainly planted as an ornamental tree, especially along roads, around schools and institutions, and in gardens. Its narrow shape makes it useful where a tall tree is wanted without taking up too much sideways space.', 'The bark has traditionally been used as a febrifuge, meaning something used traditionally to reduce fever. Research has also looked at extracts of the bark and leaves for antimicrobial, anti-inflammatory and other possible effects. These are traditional or laboratory findings, not proven treatments.', 'Observe without plucking leaves or ingesting plant parts. Wash hands after plant contact.', 'Despite its common name, False Ashoka is not the true Ashoka tree. The true Ashoka is Saraca asoca. These two plants should not be confused.',
    'published', NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
    common_name = EXCLUDED.common_name,
    other_common_names = EXCLUDED.other_common_names,
    scientific_name = EXCLUDED.scientific_name,
    family = EXCLUDED.family,
    category = EXCLUDED.category,
    identification_characteristics = EXCLUDED.identification_characteristics,
    identification_confidence = EXCLUDED.identification_confidence,
    native_origin = EXCLUDED.native_origin,
    distribution = EXCLUDED.distribution,
    campus_location = EXCLUDED.campus_location,
    flowers = EXCLUDED.flowers,
    flowering_season = EXCLUDED.flowering_season,
    fruits = EXCLUDED.fruits,
    fruiting_season = EXCLUDED.fruiting_season,
    uses = EXCLUDED.uses,
    traditional_medicinal_uses = EXCLUDED.traditional_medicinal_uses,
    safety_warnings = EXCLUDED.safety_warnings,
    interesting_facts = EXCLUDED.interesting_facts,
    status = EXCLUDED.status,
    updated_at = NOW();


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/false-ashoka-polyalthia/plant_03_1.jpg', '/images/plants/plant_03_1.jpg', 'False Ashoka (Polyalthia longifolia (Sonn.) Thwaites) photographed on campus', 'Campus specimen #3 observation', true, 1, NOW()
FROM public.plants WHERE slug = 'false-ashoka-polyalthia'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/false-ashoka-polyalthia/plant_03_2.jpg', '/images/plants/plant_03_2.jpg', 'False Ashoka (Polyalthia longifolia (Sonn.) Thwaites) photographed on campus', 'Campus specimen #3 observation', false, 2, NOW()
FROM public.plants WHERE slug = 'false-ashoka-polyalthia'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plants (
    slug, common_name, other_common_names, scientific_name, family,
    category, identification_characteristics, identification_confidence,
    native_origin, distribution, campus_location,
    flowers, flowering_season, fruits, fruiting_season,
    uses, traditional_medicinal_uses, safety_warnings, interesting_facts,
    status, created_at, updated_at
) VALUES (
    'coral-plant-jatropha', 'Coral Plant', ARRAY['Coral Bush', 'Physic Nut']::text[], 'Jatropha multifida L.', 'Euphorbiaceae.',
    'shrub', 'It is a shrub or small tree. Its leaves are very distinctive because they are deeply divided into many narrow lobes. The leaf can look almost like a hand with many thin fingers. The leaves have long stalks. It produces bright coral-red flowers in clusters on long stalks. The fruit is roughly three-sided and becomes yellowish when mature.', 'confirmed',
    'It is native to tropical and subtropical America, especially Mexico and the Caribbean, and has been introduced into many tropical regions including India. Plants of the World Online', 'Cultivated and naturalized across tropical India and campus grounds.', 'School Campus Gardens and Perimeter Grounds',
    'Seasonal inflorescences.', 'India Flora Online records flowering and fruiting roughly from August to May, although the exact timing can vary with climate. India Flora', 'The fruit is about 2.5–3 cm and has three angles. It becomes yellowish when mature and usually contains three seeds. A3 Project Details', 'Follows flowering season.',
    'In India it is mainly grown as an ornamental garden plant and can be seen in gardens, parks and landscaped campuses.', 'Traditional uses include applying latex to wounds, using leaves for scabies and other traditional preparations.', 'This is one plant where the safety information is important. The fruits and seeds can be poisonous if eaten. Reported effects of poisoning include vomiting, diarrhoea, abdominal cramps and weakness. It should not be used as a home remedy without proper medical guidance.', 'Documented by Azim Premji School students as part of the campus living biodiversity catalogue.',
    'published', NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
    common_name = EXCLUDED.common_name,
    other_common_names = EXCLUDED.other_common_names,
    scientific_name = EXCLUDED.scientific_name,
    family = EXCLUDED.family,
    category = EXCLUDED.category,
    identification_characteristics = EXCLUDED.identification_characteristics,
    identification_confidence = EXCLUDED.identification_confidence,
    native_origin = EXCLUDED.native_origin,
    distribution = EXCLUDED.distribution,
    campus_location = EXCLUDED.campus_location,
    flowers = EXCLUDED.flowers,
    flowering_season = EXCLUDED.flowering_season,
    fruits = EXCLUDED.fruits,
    fruiting_season = EXCLUDED.fruiting_season,
    uses = EXCLUDED.uses,
    traditional_medicinal_uses = EXCLUDED.traditional_medicinal_uses,
    safety_warnings = EXCLUDED.safety_warnings,
    interesting_facts = EXCLUDED.interesting_facts,
    status = EXCLUDED.status,
    updated_at = NOW();


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/coral-plant-jatropha/plant_04_1.jpg', '/images/plants/plant_04_1.jpg', 'Coral Plant (Jatropha multifida L.) photographed on campus', 'Campus specimen #4 observation', true, 1, NOW()
FROM public.plants WHERE slug = 'coral-plant-jatropha'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/coral-plant-jatropha/plant_04_2.jpg', '/images/plants/plant_04_2.jpg', 'Coral Plant (Jatropha multifida L.) photographed on campus', 'Campus specimen #4 observation', false, 2, NOW()
FROM public.plants WHERE slug = 'coral-plant-jatropha'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plants (
    slug, common_name, other_common_names, scientific_name, family,
    category, identification_characteristics, identification_confidence,
    native_origin, distribution, campus_location,
    flowers, flowering_season, fruits, fruiting_season,
    uses, traditional_medicinal_uses, safety_warnings, interesting_facts,
    status, created_at, updated_at
) VALUES (
    'frangipani-plumeria', 'Frangipani', ARRAY['Singapore Frangipani', 'White Frangipani', 'Temple Flower']::text[], 'Plumeria obtusa L.', 'Plantae',
    'shrub', 'It is a shrub or small tree. The leaves are thick and green. The leaves are generally broad, smooth and rounded or slightly notched at the tip. The flowers are white with a yellow centre. The flowers have about five petals and have a waxy appearance. The flowers are usually strongly fragrant.', 'confirmed',
    'Plumeria obtusa is native to parts of Mexico, Central America and the Caribbean and is now grown in many tropical regions. Plants of the World Online', 'Cultivated and naturalized across tropical India and campus grounds.', 'School Campus Gardens and Perimeter Grounds',
    'The flowers are one of the main reasons this plant is grown. They are used for:', 'Seasonal flowering depending on climate.', 'After flowering, it can produce paired, long seed pods. When the pods mature, they split open and release many winged seeds. The wings help the seeds move through the air.', 'Follows flowering season.',
    'Campus shade, landscape beautification, and student field study.', 'Traditional uses have been reported for wounds, some skin conditions and other purposes. These uses should be treated as traditional or experimental, not as proven medical treatments.', 'The plant produces a milky latex or sap that can irritate the skin and is considered poisonous.', 'Frangipani is especially famous for its beautiful, fragrant flowers, which is why it is so common around temples and gardens.',
    'published', NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
    common_name = EXCLUDED.common_name,
    other_common_names = EXCLUDED.other_common_names,
    scientific_name = EXCLUDED.scientific_name,
    family = EXCLUDED.family,
    category = EXCLUDED.category,
    identification_characteristics = EXCLUDED.identification_characteristics,
    identification_confidence = EXCLUDED.identification_confidence,
    native_origin = EXCLUDED.native_origin,
    distribution = EXCLUDED.distribution,
    campus_location = EXCLUDED.campus_location,
    flowers = EXCLUDED.flowers,
    flowering_season = EXCLUDED.flowering_season,
    fruits = EXCLUDED.fruits,
    fruiting_season = EXCLUDED.fruiting_season,
    uses = EXCLUDED.uses,
    traditional_medicinal_uses = EXCLUDED.traditional_medicinal_uses,
    safety_warnings = EXCLUDED.safety_warnings,
    interesting_facts = EXCLUDED.interesting_facts,
    status = EXCLUDED.status,
    updated_at = NOW();


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/frangipani-plumeria/plant_05_1.jpg', '/images/plants/plant_05_1.jpg', 'Frangipani (Plumeria obtusa L.) photographed on campus', 'Campus specimen #5 observation', true, 1, NOW()
FROM public.plants WHERE slug = 'frangipani-plumeria'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/frangipani-plumeria/plant_05_2.jpg', '/images/plants/plant_05_2.jpg', 'Frangipani (Plumeria obtusa L.) photographed on campus', 'Campus specimen #5 observation', false, 2, NOW()
FROM public.plants WHERE slug = 'frangipani-plumeria'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plants (
    slug, common_name, other_common_names, scientific_name, family,
    category, identification_characteristics, identification_confidence,
    native_origin, distribution, campus_location,
    flowers, flowering_season, fruits, fruiting_season,
    uses, traditional_medicinal_uses, safety_warnings, interesting_facts,
    status, created_at, updated_at
) VALUES (
    'peacock-flower-caesalpinia', 'Peacock Flower', ARRAY['Barbados Pride', 'Dwarf Poinciana']::text[], 'Caesalpinia pulcherrima (L.) Sw.', 'Fabaceae.',
    'shrub', 'It is usually a shrub or small tree. The leaves are bipinnately compound, meaning the leaves are divided twice into many small leaflets. The flowers are very bright and can be red, orange, yellow or a mixture of these colours. The flowers have very long stamens sticking out beyond the petals. The stems can have small prickles. It produces flat, elongated seed pods. Plants of the World Online', 'confirmed',
    'It is native to tropical America, especially areas from southeastern Mexico to Central America. It is now widely grown in India and other tropical countries. Plants of the World Online', 'Cultivated and naturalized across tropical India and campus grounds.', 'School Campus Gardens and Perimeter Grounds',
    'Seasonal inflorescences.', 'Indian botanical records report flowering and fruiting throughout the year, while some regional sources give periods such as May–October. So it is better to say that it can flower for a long period in warm climates. India Flora', 'It produces flat, elongated pods which become darker as they mature and contain several seeds.', 'Follows flowering season.',
    'It is mainly grown as an ornamental plant because of its bright flowers. It is used in gardens, along roadsides, hedges and landscaped areas.', 'Different parts of the plant have traditional medicinal uses, but some preparations can also be harmful. For the project, it is better to describe these as traditional uses rather than proven treatments. Plants of the World Online', 'Observe without plucking leaves or ingesting plant parts. Wash hands after plant contact.', 'The long stamens sticking out from the flowers are one of the reasons the flower looks so unusual and showy.',
    'published', NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
    common_name = EXCLUDED.common_name,
    other_common_names = EXCLUDED.other_common_names,
    scientific_name = EXCLUDED.scientific_name,
    family = EXCLUDED.family,
    category = EXCLUDED.category,
    identification_characteristics = EXCLUDED.identification_characteristics,
    identification_confidence = EXCLUDED.identification_confidence,
    native_origin = EXCLUDED.native_origin,
    distribution = EXCLUDED.distribution,
    campus_location = EXCLUDED.campus_location,
    flowers = EXCLUDED.flowers,
    flowering_season = EXCLUDED.flowering_season,
    fruits = EXCLUDED.fruits,
    fruiting_season = EXCLUDED.fruiting_season,
    uses = EXCLUDED.uses,
    traditional_medicinal_uses = EXCLUDED.traditional_medicinal_uses,
    safety_warnings = EXCLUDED.safety_warnings,
    interesting_facts = EXCLUDED.interesting_facts,
    status = EXCLUDED.status,
    updated_at = NOW();


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/peacock-flower-caesalpinia/plant_06_1.jpg', '/images/plants/plant_06_1.jpg', 'Peacock Flower (Caesalpinia pulcherrima (L.) Sw.) photographed on campus', 'Campus specimen #6 observation', true, 1, NOW()
FROM public.plants WHERE slug = 'peacock-flower-caesalpinia'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/peacock-flower-caesalpinia/plant_06_2.jpg', '/images/plants/plant_06_2.jpg', 'Peacock Flower (Caesalpinia pulcherrima (L.) Sw.) photographed on campus', 'Campus specimen #6 observation', false, 2, NOW()
FROM public.plants WHERE slug = 'peacock-flower-caesalpinia'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plants (
    slug, common_name, other_common_names, scientific_name, family,
    category, identification_characteristics, identification_confidence,
    native_origin, distribution, campus_location,
    flowers, flowering_season, fruits, fruiting_season,
    uses, traditional_medicinal_uses, safety_warnings, interesting_facts,
    status, created_at, updated_at
) VALUES (
    'madagascar-periwinkle-catharanthus', 'Madagascar Periwinkle', ARRAY['Sadabahar', 'Sadaphuli']::text[], 'Catharanthus roseus (L.) G.Don', 'Apocynaceae.',
    'herb', 'It is a small, bushy herb or subshrub. The leaves are dark green, glossy and arranged opposite each other. The flowers have five broad petals.', 'confirmed',
    'It is native to Madagascar, not India. It is now grown widely in tropical and subtropical countries, including India. A3 Project Details (2)(1)', 'Cultivated and naturalized across tropical India and campus grounds.', 'School Campus Gardens and Perimeter Grounds',
    'Seasonal inflorescences.', 'The flowers are small but very noticeable. In warm climates, the plant can flower almost throughout the year rather than having one short flowering season. A3 Project Details (2)(1)', 'Instead of a fleshy fruit, it produces two narrow seed pods, called follicles. They contain many dark seeds.', 'Follows flowering season.',
    'It is commonly grown as an ornamental garden plant.', 'This plant has a very interesting connection with medicine. Scientists discovered compounds in it that helped lead to the development of vincristine and vinblastine, medicines used in cancer treatment.', 'The plant also contains powerful natural chemicals and should not be eaten or used as a home remedy. Its sap is toxic.', 'The same small garden plant that looks simple and pretty has contributed to important medicines used to treat cancer.',
    'published', NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
    common_name = EXCLUDED.common_name,
    other_common_names = EXCLUDED.other_common_names,
    scientific_name = EXCLUDED.scientific_name,
    family = EXCLUDED.family,
    category = EXCLUDED.category,
    identification_characteristics = EXCLUDED.identification_characteristics,
    identification_confidence = EXCLUDED.identification_confidence,
    native_origin = EXCLUDED.native_origin,
    distribution = EXCLUDED.distribution,
    campus_location = EXCLUDED.campus_location,
    flowers = EXCLUDED.flowers,
    flowering_season = EXCLUDED.flowering_season,
    fruits = EXCLUDED.fruits,
    fruiting_season = EXCLUDED.fruiting_season,
    uses = EXCLUDED.uses,
    traditional_medicinal_uses = EXCLUDED.traditional_medicinal_uses,
    safety_warnings = EXCLUDED.safety_warnings,
    interesting_facts = EXCLUDED.interesting_facts,
    status = EXCLUDED.status,
    updated_at = NOW();


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/madagascar-periwinkle-catharanthus/plant_07_1.jpg', '/images/plants/plant_07_1.jpg', 'Madagascar Periwinkle (Catharanthus roseus (L.) G.Don) photographed on campus', 'Campus specimen #7 observation', true, 1, NOW()
FROM public.plants WHERE slug = 'madagascar-periwinkle-catharanthus'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/madagascar-periwinkle-catharanthus/plant_07_2.jpg', '/images/plants/plant_07_2.jpg', 'Madagascar Periwinkle (Catharanthus roseus (L.) G.Don) photographed on campus', 'Campus specimen #7 observation', false, 2, NOW()
FROM public.plants WHERE slug = 'madagascar-periwinkle-catharanthus'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plants (
    slug, common_name, other_common_names, scientific_name, family,
    category, identification_characteristics, identification_confidence,
    native_origin, distribution, campus_location,
    flowers, flowering_season, fruits, fruiting_season,
    uses, traditional_medicinal_uses, safety_warnings, interesting_facts,
    status, created_at, updated_at
) VALUES (
    'drumstick-tree-moringa', 'Drumstick Tree', ARRAY['Moringa', 'Munga', 'Shevga']::text[], 'Moringa oleifera Lam.', 'Moringaceae.',
    'tree', 'The leaves look very fine and feathery. What looks like many tiny leaves is actually one large compound leaf divided many times. The flowers are small, pale white or creamy-white and fragrant. The tree usually has a slender trunk and an open crown. Its famous long hanging pods look like drumsticks.', 'confirmed',
    'Moringa is actually native to the Indian subcontinent, unlike many of the ornamental plants in the garden. It is now grown throughout tropical regions.', 'Cultivated and naturalized across tropical India and campus grounds.', 'School Campus Gardens and Perimeter Grounds',
    'Seasonal inflorescences.', 'The flowers are fragrant and occur in loose clusters. Flowering varies by region. It can flower several times a year in warm climates, and some Indian regions have major flowering around February–March.', 'Small seeds or berries.', 'Follows flowering season.',
    'Almost the whole plant has uses.', 'Moringa is very nutritious, but many internet claims call it a “miracle tree.” It is better not to say that it cures diseases.', 'Observe without plucking leaves or ingesting plant parts. Wash hands after plant contact.', 'Moringa seeds have been studied for their ability to help clarify dirty water by making suspended particles clump together. However, this does not mean the treated water is automatically safe to drink; proper treatment is still needed.',
    'published', NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
    common_name = EXCLUDED.common_name,
    other_common_names = EXCLUDED.other_common_names,
    scientific_name = EXCLUDED.scientific_name,
    family = EXCLUDED.family,
    category = EXCLUDED.category,
    identification_characteristics = EXCLUDED.identification_characteristics,
    identification_confidence = EXCLUDED.identification_confidence,
    native_origin = EXCLUDED.native_origin,
    distribution = EXCLUDED.distribution,
    campus_location = EXCLUDED.campus_location,
    flowers = EXCLUDED.flowers,
    flowering_season = EXCLUDED.flowering_season,
    fruits = EXCLUDED.fruits,
    fruiting_season = EXCLUDED.fruiting_season,
    uses = EXCLUDED.uses,
    traditional_medicinal_uses = EXCLUDED.traditional_medicinal_uses,
    safety_warnings = EXCLUDED.safety_warnings,
    interesting_facts = EXCLUDED.interesting_facts,
    status = EXCLUDED.status,
    updated_at = NOW();


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/drumstick-tree-moringa/plant_08_1.jpg', '/images/plants/plant_08_1.jpg', 'Drumstick Tree (Moringa oleifera Lam.) photographed on campus', 'Campus specimen #8 observation', true, 1, NOW()
FROM public.plants WHERE slug = 'drumstick-tree-moringa'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/drumstick-tree-moringa/plant_08_2.jpg', '/images/plants/plant_08_2.jpg', 'Drumstick Tree (Moringa oleifera Lam.) photographed on campus', 'Campus specimen #8 observation', false, 2, NOW()
FROM public.plants WHERE slug = 'drumstick-tree-moringa'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plants (
    slug, common_name, other_common_names, scientific_name, family,
    category, identification_characteristics, identification_confidence,
    native_origin, distribution, campus_location,
    flowers, flowering_season, fruits, fruiting_season,
    uses, traditional_medicinal_uses, safety_warnings, interesting_facts,
    status, created_at, updated_at
) VALUES (
    'oleander-nerium', 'Oleander', ARRAY['Kaner', 'Karavira']::text[], 'Nerium oleander L.', 'Apocynaceae.',
    'shrub', 'It is an evergreen shrub or small tree. The leaves are long, narrow and pointed. They are thick and leathery. Leaves usually occur opposite each other or in groups. The central vein of the leaf is quite noticeable.', 'confirmed',
    'Oleander has a broad native range extending from the Mediterranean region through parts of the Middle East and Indian subcontinent to Myanmar. It is now grown widely in warm regions.', 'Cultivated and naturalized across tropical India and campus grounds.', 'School Campus Gardens and Perimeter Grounds',
    'Flowers can be pink, white, red or purple and usually have five spreading lobes.', 'It can have a long flowering period, especially in warm climates, and may produce flowers for much of the year.', 'Instead of a fleshy fruit, it produces long narrow pods. When they open, they release seeds with fine hairs that help them move through the air.', 'Follows flowering season.',
    'It is mainly used as an ornamental plant. It is popular because it can tolerate heat, drought, poor soil and some urban conditions. This is why it is often seen along roads and in gardens.', 'Documented in traditional Indian ethnobotany.', 'Every part of Oleander is highly poisonous if eaten. It contains cardiac glycosides such as oleandrin, which can affect the heart. Its sap can also irritate the skin, and burning the plant can produce harmful smoke.', 'Although it is poisonous to humans, Oleander is a food plant for the caterpillars of the Common Crow butterfly.',
    'published', NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
    common_name = EXCLUDED.common_name,
    other_common_names = EXCLUDED.other_common_names,
    scientific_name = EXCLUDED.scientific_name,
    family = EXCLUDED.family,
    category = EXCLUDED.category,
    identification_characteristics = EXCLUDED.identification_characteristics,
    identification_confidence = EXCLUDED.identification_confidence,
    native_origin = EXCLUDED.native_origin,
    distribution = EXCLUDED.distribution,
    campus_location = EXCLUDED.campus_location,
    flowers = EXCLUDED.flowers,
    flowering_season = EXCLUDED.flowering_season,
    fruits = EXCLUDED.fruits,
    fruiting_season = EXCLUDED.fruiting_season,
    uses = EXCLUDED.uses,
    traditional_medicinal_uses = EXCLUDED.traditional_medicinal_uses,
    safety_warnings = EXCLUDED.safety_warnings,
    interesting_facts = EXCLUDED.interesting_facts,
    status = EXCLUDED.status,
    updated_at = NOW();


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/oleander-nerium/plant_09_1.jpg', '/images/plants/plant_09_1.jpg', 'Oleander (Nerium oleander L.) photographed on campus', 'Campus specimen #9 observation', true, 1, NOW()
FROM public.plants WHERE slug = 'oleander-nerium'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/oleander-nerium/plant_09_2.jpg', '/images/plants/plant_09_2.jpg', 'Oleander (Nerium oleander L.) photographed on campus', 'Campus specimen #9 observation', false, 2, NOW()
FROM public.plants WHERE slug = 'oleander-nerium'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/oleander-nerium/plant_09_3.png', '/images/plants/plant_09_3.png', 'Oleander (Nerium oleander L.) photographed on campus', 'Campus specimen #9 observation', false, 3, NOW()
FROM public.plants WHERE slug = 'oleander-nerium'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/oleander-nerium/plant_09_4.png', '/images/plants/plant_09_4.png', 'Oleander (Nerium oleander L.) photographed on campus', 'Campus specimen #9 observation', false, 4, NOW()
FROM public.plants WHERE slug = 'oleander-nerium'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/oleander-nerium/plant_09_5.png', '/images/plants/plant_09_5.png', 'Oleander (Nerium oleander L.) photographed on campus', 'Campus specimen #9 observation', false, 5, NOW()
FROM public.plants WHERE slug = 'oleander-nerium'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plants (
    slug, common_name, other_common_names, scientific_name, family,
    category, identification_characteristics, identification_confidence,
    native_origin, distribution, campus_location,
    flowers, flowering_season, fruits, fruiting_season,
    uses, traditional_medicinal_uses, safety_warnings, interesting_facts,
    status, created_at, updated_at
) VALUES (
    'taro-colocasia', 'Taro', ARRAY['Elephant Ear', 'Arbi', 'Dasheen']::text[], 'Colocasia esculenta (L.) Schott', 'Araceae.',
    'tree', 'Very large leaves. Leaves are broadly heart-shaped or arrow-shaped. The veins are very noticeable. The leaf stalks are long and thick. Several leaves grow together from the base. The leaf stalk attaches toward the underside of the leaf rather than simply at the edge. This is called a peltate arrangement.', 'confirmed',
    'Its native range extends from India through southern China and Southeast Asia to Sumatra. It has been cultivated and spread to many tropical regions.', 'Cultivated and naturalized across tropical India and campus grounds.', 'School Campus Gardens and Perimeter Grounds',
    'The flowers are not very noticeable. Like other members of the Araceae family, it has a spadix surrounded by a spathe.', 'There is no single reliable flowering season. Some cultivated varieties may flower rarely.', 'Small seeds or berries.', 'Follows flowering season.',
    'Taro is much more than an ornamental plant. It is an important food crop.', 'Documented in traditional Indian ethnobotany.', 'Raw taro contains calcium oxalate crystals, which can cause burning and irritation in the mouth and throat. The edible parts need to be properly cooked.', 'The huge leaves can shed water. Water droplets can sit on the surface and roll away instead of immediately soaking into the leaf.',
    'published', NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
    common_name = EXCLUDED.common_name,
    other_common_names = EXCLUDED.other_common_names,
    scientific_name = EXCLUDED.scientific_name,
    family = EXCLUDED.family,
    category = EXCLUDED.category,
    identification_characteristics = EXCLUDED.identification_characteristics,
    identification_confidence = EXCLUDED.identification_confidence,
    native_origin = EXCLUDED.native_origin,
    distribution = EXCLUDED.distribution,
    campus_location = EXCLUDED.campus_location,
    flowers = EXCLUDED.flowers,
    flowering_season = EXCLUDED.flowering_season,
    fruits = EXCLUDED.fruits,
    fruiting_season = EXCLUDED.fruiting_season,
    uses = EXCLUDED.uses,
    traditional_medicinal_uses = EXCLUDED.traditional_medicinal_uses,
    safety_warnings = EXCLUDED.safety_warnings,
    interesting_facts = EXCLUDED.interesting_facts,
    status = EXCLUDED.status,
    updated_at = NOW();


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/taro-colocasia/plant_10_1.jpg', '/images/plants/plant_10_1.jpg', 'Taro (Colocasia esculenta (L.) Schott) photographed on campus', 'Campus specimen #10 observation', true, 1, NOW()
FROM public.plants WHERE slug = 'taro-colocasia'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plants (
    slug, common_name, other_common_names, scientific_name, family,
    category, identification_characteristics, identification_confidence,
    native_origin, distribution, campus_location,
    flowers, flowering_season, fruits, fruiting_season,
    uses, traditional_medicinal_uses, safety_warnings, interesting_facts,
    status, created_at, updated_at
) VALUES (
    'pomegranate-punica', 'Pomegranate', ARRAY['Anar']::text[], 'Punica granatum L.', 'Lythraceae.',
    'shrub', 'It is a small tree or large, highly branched shrub. The leaves are small, narrow and glossy. Some branches may have short spines. The fruits are round and reddish-brown when mature. The most useful feature is the little crown at the top of the fruit.', 'confirmed',
    'Pomegranate is native to parts of Southwest and Central Asia, including areas around Iran, Afghanistan and Pakistan. It has been cultivated widely in India.', 'Cultivated and naturalized across tropical India and campus grounds.', 'School Campus Gardens and Perimeter Grounds',
    'The flowers are usually bright red to orange-red and can be around 3–5 cm across.', 'Pomegranate does not have one fixed flowering season. In India, farmers can manage the flowering and fruiting cycles, so it can have more than one flowering period in a year.', 'The fruit is mainly eaten fresh. It is also used for:', 'Follows flowering season.',
    'Campus shade, landscape beautification, and student field study.', 'Documented in traditional Indian ethnobotany.', 'Observe without plucking leaves or ingesting plant parts. Wash hands after plant contact.', 'The little “crown” on top of a pomegranate is actually part of the original flower. It is the flower''s calyx, which remains attached as the fruit develops.',
    'published', NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
    common_name = EXCLUDED.common_name,
    other_common_names = EXCLUDED.other_common_names,
    scientific_name = EXCLUDED.scientific_name,
    family = EXCLUDED.family,
    category = EXCLUDED.category,
    identification_characteristics = EXCLUDED.identification_characteristics,
    identification_confidence = EXCLUDED.identification_confidence,
    native_origin = EXCLUDED.native_origin,
    distribution = EXCLUDED.distribution,
    campus_location = EXCLUDED.campus_location,
    flowers = EXCLUDED.flowers,
    flowering_season = EXCLUDED.flowering_season,
    fruits = EXCLUDED.fruits,
    fruiting_season = EXCLUDED.fruiting_season,
    uses = EXCLUDED.uses,
    traditional_medicinal_uses = EXCLUDED.traditional_medicinal_uses,
    safety_warnings = EXCLUDED.safety_warnings,
    interesting_facts = EXCLUDED.interesting_facts,
    status = EXCLUDED.status,
    updated_at = NOW();


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/pomegranate-punica/plant_11_1.jpg', '/images/plants/plant_11_1.jpg', 'Pomegranate (Punica granatum L.) photographed on campus', 'Campus specimen #11 observation', true, 1, NOW()
FROM public.plants WHERE slug = 'pomegranate-punica'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/pomegranate-punica/plant_11_2.jpg', '/images/plants/plant_11_2.jpg', 'Pomegranate (Punica granatum L.) photographed on campus', 'Campus specimen #11 observation', false, 2, NOW()
FROM public.plants WHERE slug = 'pomegranate-punica'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plants (
    slug, common_name, other_common_names, scientific_name, family,
    category, identification_characteristics, identification_confidence,
    native_origin, distribution, campus_location,
    flowers, flowering_season, fruits, fruiting_season,
    uses, traditional_medicinal_uses, safety_warnings, interesting_facts,
    status, created_at, updated_at
) VALUES (
    'rose-rosa', 'Rose', ARRAY['Garden Rose']::text[], 'Rosa spp.', 'Rosaceae.',
    'shrub', 'The exact species or variety cannot be confirmed from the photograph, because there are thousands of cultivated roses. So Rosa spp. is the safer scientific identification. Woody, branching shrub. Compound leaves made of several smaller leaflets. Leaflets have serrated edges. Stems have sharp structures called prickles. Large, colourful flowers. Bushy growth.', 'confirmed',
    'Indian Subcontinent and tropical regions.', 'Cultivated and naturalized across tropical India and campus grounds.', 'School Campus Gardens and Perimeter Grounds',
    'Roses can be red, pink, white, yellow, orange, purple and many other shades. Some have only a few petals, while cultivated double roses can have many layers of petals.', 'There isn''t one fixed season. Many modern garden roses can flower repeatedly, depending on the variety, climate and pruning.', 'Small seeds or berries.', 'Follows flowering season.',
    'Roses are grown for:', 'Documented in traditional Indian ethnobotany.', 'Observe without plucking leaves or ingesting plant parts. Wash hands after plant contact.', 'Roses produce a fruit-like structure called a rose hip after flowering. The rose hip contains the actual small fruits called achenes. Many modern garden roses are the result of centuries of breeding and hybridization. So the roses we see in gardens are often very different from wild roses.',
    'published', NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
    common_name = EXCLUDED.common_name,
    other_common_names = EXCLUDED.other_common_names,
    scientific_name = EXCLUDED.scientific_name,
    family = EXCLUDED.family,
    category = EXCLUDED.category,
    identification_characteristics = EXCLUDED.identification_characteristics,
    identification_confidence = EXCLUDED.identification_confidence,
    native_origin = EXCLUDED.native_origin,
    distribution = EXCLUDED.distribution,
    campus_location = EXCLUDED.campus_location,
    flowers = EXCLUDED.flowers,
    flowering_season = EXCLUDED.flowering_season,
    fruits = EXCLUDED.fruits,
    fruiting_season = EXCLUDED.fruiting_season,
    uses = EXCLUDED.uses,
    traditional_medicinal_uses = EXCLUDED.traditional_medicinal_uses,
    safety_warnings = EXCLUDED.safety_warnings,
    interesting_facts = EXCLUDED.interesting_facts,
    status = EXCLUDED.status,
    updated_at = NOW();


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/rose-rosa/plant_12_1.jpg', '/images/plants/plant_12_1.jpg', 'Rose (Rosa spp.) photographed on campus', 'Campus specimen #12 observation', true, 1, NOW()
FROM public.plants WHERE slug = 'rose-rosa'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plants (
    slug, common_name, other_common_names, scientific_name, family,
    category, identification_characteristics, identification_confidence,
    native_origin, distribution, campus_location,
    flowers, flowering_season, fruits, fruiting_season,
    uses, traditional_medicinal_uses, safety_warnings, interesting_facts,
    status, created_at, updated_at
) VALUES (
    'golden-dewdrop-duranta', 'Golden Dewdrop', ARRAY['Sky Flower', 'Pigeon Berry']::text[], 'Duranta erecta L.', 'Verbenaceae — the verbena family.',
    'shrub', 'Dense, branching shrub. Small, smooth, oval to elliptical leaves. Leaves are arranged opposite each other. Some plants have spines on their branches. The plant produces clusters of yellow-orange fruits. The bright yellow clusters seen in the photograph are fruits, not flowers. The actual flowers of Duranta are usually blue, violet, lavender or sometimes white. The yellow-orange fruits appear later after flowering. A3 Project Details (2)(1)', 'confirmed',
    'It is native to tropical and subtropical America, but is now widely cultivated in warm regions including India.', 'Cultivated and naturalized across tropical India and campus grounds.', 'School Campus Gardens and Perimeter Grounds',
    'Seasonal inflorescences.', 'The flowers are small and tubular and grow in long clusters. In warm climates, flowering can continue for a long period.', 'The fruits are round, shiny and yellow to orange-yellow. They hang in clusters and are technically drupes, although the plant is commonly called Pigeon Berry.', 'Follows flowering season.',
    'It is mainly used for:', 'Documented in traditional Indian ethnobotany.', 'The fruits should not be eaten by humans because they are considered poisonous. Birds can eat them and help spread the seeds.', 'This plant gives us a nice flower → fruit story: blue/violet flowers first, then yellow-orange fruits later.',
    'published', NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
    common_name = EXCLUDED.common_name,
    other_common_names = EXCLUDED.other_common_names,
    scientific_name = EXCLUDED.scientific_name,
    family = EXCLUDED.family,
    category = EXCLUDED.category,
    identification_characteristics = EXCLUDED.identification_characteristics,
    identification_confidence = EXCLUDED.identification_confidence,
    native_origin = EXCLUDED.native_origin,
    distribution = EXCLUDED.distribution,
    campus_location = EXCLUDED.campus_location,
    flowers = EXCLUDED.flowers,
    flowering_season = EXCLUDED.flowering_season,
    fruits = EXCLUDED.fruits,
    fruiting_season = EXCLUDED.fruiting_season,
    uses = EXCLUDED.uses,
    traditional_medicinal_uses = EXCLUDED.traditional_medicinal_uses,
    safety_warnings = EXCLUDED.safety_warnings,
    interesting_facts = EXCLUDED.interesting_facts,
    status = EXCLUDED.status,
    updated_at = NOW();


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/golden-dewdrop-duranta/plant_13_1.jpg', '/images/plants/plant_13_1.jpg', 'Golden Dewdrop (Duranta erecta L.) photographed on campus', 'Campus specimen #13 observation', true, 1, NOW()
FROM public.plants WHERE slug = 'golden-dewdrop-duranta'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/golden-dewdrop-duranta/plant_13_2.jpg', '/images/plants/plant_13_2.jpg', 'Golden Dewdrop (Duranta erecta L.) photographed on campus', 'Campus specimen #13 observation', false, 2, NOW()
FROM public.plants WHERE slug = 'golden-dewdrop-duranta'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plants (
    slug, common_name, other_common_names, scientific_name, family,
    category, identification_characteristics, identification_confidence,
    native_origin, distribution, campus_location,
    flowers, flowering_season, fruits, fruiting_season,
    uses, traditional_medicinal_uses, safety_warnings, interesting_facts,
    status, created_at, updated_at
) VALUES (
    'neem-azadirachta', 'Neem', ARRAY['Indian Neem', 'Margosa', 'Indian Lilac']::text[], 'Azadirachta indica A.Juss.', 'Meliaceae.',
    'tree', 'Medium to large evergreen tree. Long pinnate compound leaves. Each leaf is actually made up of many smaller leaflets. Leaflets are narrow, pointed and have clearly serrated edges. The tree develops a spreading crown.', 'confirmed',
    'Neem is native to South and Southeast Asia and is now grown widely in tropical regions. It is especially well suited to warm and relatively dry conditions.', 'Cultivated and naturalized across tropical India and campus grounds.', 'School Campus Gardens and Perimeter Grounds',
    'Neem produces small white, fragrant flowers in branching clusters.', 'In many parts of India, neem flowers around February–April, although the exact timing can vary with location. Fruits commonly appear later, around June–August in some regions.', 'The fruit is a small oval or oblong drupe. It is green when young and becomes yellow or yellow-green when mature.', 'Follows flowering season.',
    'Almost every part of the neem tree has traditional uses. Some important ones are:', 'Neem has a long history in traditional medicine, but it is better not to say that neem simply “cures” diseases. Many medicinal claims still need stronger evidence.', 'Observe without plucking leaves or ingesting plant parts. Wash hands after plant contact.', 'Neem seeds contain a compound called azadirachtin, which can interfere with the feeding, growth and reproduction of certain insect pests. This is why neem products are used in natural pest management. Before modern toothbrushes became common, neem twigs were traditionally used as natural toothbrushes, called datun.',
    'published', NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
    common_name = EXCLUDED.common_name,
    other_common_names = EXCLUDED.other_common_names,
    scientific_name = EXCLUDED.scientific_name,
    family = EXCLUDED.family,
    category = EXCLUDED.category,
    identification_characteristics = EXCLUDED.identification_characteristics,
    identification_confidence = EXCLUDED.identification_confidence,
    native_origin = EXCLUDED.native_origin,
    distribution = EXCLUDED.distribution,
    campus_location = EXCLUDED.campus_location,
    flowers = EXCLUDED.flowers,
    flowering_season = EXCLUDED.flowering_season,
    fruits = EXCLUDED.fruits,
    fruiting_season = EXCLUDED.fruiting_season,
    uses = EXCLUDED.uses,
    traditional_medicinal_uses = EXCLUDED.traditional_medicinal_uses,
    safety_warnings = EXCLUDED.safety_warnings,
    interesting_facts = EXCLUDED.interesting_facts,
    status = EXCLUDED.status,
    updated_at = NOW();


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/neem-azadirachta/plant_14_1.jpg', '/images/plants/plant_14_1.jpg', 'Neem (Azadirachta indica A.Juss.) photographed on campus', 'Campus specimen #14 observation', true, 1, NOW()
FROM public.plants WHERE slug = 'neem-azadirachta'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plants (
    slug, common_name, other_common_names, scientific_name, family,
    category, identification_characteristics, identification_confidence,
    native_origin, distribution, campus_location,
    flowers, flowering_season, fruits, fruiting_season,
    uses, traditional_medicinal_uses, safety_warnings, interesting_facts,
    status, created_at, updated_at
) VALUES (
    'chestnutleaf-trumpetbush-tecoma', 'Chestnutleaf Trumpetbush', ARRAY['Yellow Trumpetbush']::text[], 'Tecoma castanifolia (D.Don) Melch.', 'Bignoniaceae — the trumpet-vine family.',
    'shrub', 'The identification is considered probable rather than 100% certain, because Tecoma stans looks very similar. The main difference is in the leaves. Leaves are usually simple, meaning one continuous leaf blade. Leaves are long and lance-shaped. They have strongly serrated edges. Leaves are arranged opposite each other.', 'confirmed',
    'It is native to western South America, including areas of Ecuador and Peru. It is grown in India as an ornamental plant.', 'Cultivated and naturalized across tropical India and campus grounds.', 'School Campus Gardens and Perimeter Grounds',
    'The flowers are bright yellow and shaped like little trumpets. A large group in the photograph is actually made up of many individual flowers, not one giant flower.', 'In warm climates, it can have a long flowering period, but there isn''t one reliable month that applies everywhere.', 'After flowering it produces long, narrow seed capsules. When mature, the capsules split open and release seeds.', 'Follows flowering season.',
    'Mainly used as an ornamental plant in gardens, parks, borders and landscaped areas.', 'Documented in traditional Indian ethnobotany.', 'Observe without plucking leaves or ingesting plant parts. Wash hands after plant contact.', 'The name “Trumpetbush” makes sense because the flowers really do look like small yellow trumpets.',
    'published', NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
    common_name = EXCLUDED.common_name,
    other_common_names = EXCLUDED.other_common_names,
    scientific_name = EXCLUDED.scientific_name,
    family = EXCLUDED.family,
    category = EXCLUDED.category,
    identification_characteristics = EXCLUDED.identification_characteristics,
    identification_confidence = EXCLUDED.identification_confidence,
    native_origin = EXCLUDED.native_origin,
    distribution = EXCLUDED.distribution,
    campus_location = EXCLUDED.campus_location,
    flowers = EXCLUDED.flowers,
    flowering_season = EXCLUDED.flowering_season,
    fruits = EXCLUDED.fruits,
    fruiting_season = EXCLUDED.fruiting_season,
    uses = EXCLUDED.uses,
    traditional_medicinal_uses = EXCLUDED.traditional_medicinal_uses,
    safety_warnings = EXCLUDED.safety_warnings,
    interesting_facts = EXCLUDED.interesting_facts,
    status = EXCLUDED.status,
    updated_at = NOW();


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/chestnutleaf-trumpetbush-tecoma/plant_15_1.jpg', '/images/plants/plant_15_1.jpg', 'Chestnutleaf Trumpetbush (Tecoma castanifolia (D.Don) Melch.) photographed on campus', 'Campus specimen #15 observation', true, 1, NOW()
FROM public.plants WHERE slug = 'chestnutleaf-trumpetbush-tecoma'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plants (
    slug, common_name, other_common_names, scientific_name, family,
    category, identification_characteristics, identification_confidence,
    native_origin, distribution, campus_location,
    flowers, flowering_season, fruits, fruiting_season,
    uses, traditional_medicinal_uses, safety_warnings, interesting_facts,
    status, created_at, updated_at
) VALUES (
    'indian-almond-terminalia', 'Indian Almond', ARRAY['Tropical Almond', 'Country Almond', 'Desi Badam', 'Jangli Badam']::text[], 'Terminalia catappa L.', 'Combretaceae.',
    'tree', 'Large, thick, glossy leaves. Leaves are broadly oval or obovate. Many leaves are grouped near the ends of branches. Older trees can have branches growing in horizontal levels or tiers. This can give the tree a layered or pagoda-like shape. Leaves:One of the most interesting features is that older leaves can change colour before falling. They can become yellow, orange, red or even reddish-purple.', 'confirmed',
    'Indian Subcontinent and tropical regions.', 'Cultivated and naturalized across tropical India and campus grounds.', 'School Campus Gardens and Perimeter Grounds',
    'The flowers are small and not very showy. They are white to greenish-white and occur in long slender spikes.', 'The exact timing varies by region, but Indian records give flowering during warmer months, roughly February–June in some areas.', 'It produces a large, flattened, almond-shaped fruit. The fruit changes colour as it matures and contains a hard shell with an edible kernel.', 'Follows flowering season.',
    'It is used as a shade and ornamental tree. The kernel can be eaten, and the wood has also been used for various purposes.', 'Documented in traditional Indian ethnobotany.', 'Observe without plucking leaves or ingesting plant parts. Wash hands after plant contact.', 'The fruit can float in water. This allows it to travel to other places and helps the seeds spread, especially in tropical coastal areas.',
    'published', NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
    common_name = EXCLUDED.common_name,
    other_common_names = EXCLUDED.other_common_names,
    scientific_name = EXCLUDED.scientific_name,
    family = EXCLUDED.family,
    category = EXCLUDED.category,
    identification_characteristics = EXCLUDED.identification_characteristics,
    identification_confidence = EXCLUDED.identification_confidence,
    native_origin = EXCLUDED.native_origin,
    distribution = EXCLUDED.distribution,
    campus_location = EXCLUDED.campus_location,
    flowers = EXCLUDED.flowers,
    flowering_season = EXCLUDED.flowering_season,
    fruits = EXCLUDED.fruits,
    fruiting_season = EXCLUDED.fruiting_season,
    uses = EXCLUDED.uses,
    traditional_medicinal_uses = EXCLUDED.traditional_medicinal_uses,
    safety_warnings = EXCLUDED.safety_warnings,
    interesting_facts = EXCLUDED.interesting_facts,
    status = EXCLUDED.status,
    updated_at = NOW();


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/indian-almond-terminalia/plant_16_1.jpg', '/images/plants/plant_16_1.jpg', 'Indian Almond (Terminalia catappa L.) photographed on campus', 'Campus specimen #16 observation', true, 1, NOW()
FROM public.plants WHERE slug = 'indian-almond-terminalia'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plants (
    slug, common_name, other_common_names, scientific_name, family,
    category, identification_characteristics, identification_confidence,
    native_origin, distribution, campus_location,
    flowers, flowering_season, fruits, fruiting_season,
    uses, traditional_medicinal_uses, safety_warnings, interesting_facts,
    status, created_at, updated_at
) VALUES (
    'yellow-bells-tecoma', 'Yellow Bells', ARRAY['Yellow Trumpetbush']::text[], 'Tecoma stans (L.) Juss. ex Kunth', 'Bignoniaceae.',
    'shrub', 'It has compound leaves. Each leaf is divided into several separate leaflets. Usually there are around 5–7 leaflets. The leaflets are pointed and sharply serrated. The flowers are bright yellow and trumpet-shaped.', 'confirmed',
    'It is native to tropical and subtropical America, including Mexico, Central and South America and parts of the Caribbean. It has been introduced and cultivated in India.', 'Cultivated and naturalized across tropical India and campus grounds.', 'School Campus Gardens and Perimeter Grounds',
    'Seasonal inflorescences.', 'The flowers are bright yellow, trumpet-shaped and around 4–5 cm long. In warm climates, it can flower for much of the year.', 'After flowering, it produces a long, narrow seed capsule, sometimes around 10–20 cm long. When the capsule opens, it releases many seeds.', 'Follows flowering season.',
    'It is mainly planted for its bright flowers in:', 'There are traditional and research claims about medicinal uses of Tecoma stans, but the research document specifically recommends not presenting it as a proven treatment for diseases. The flower, leaves and seed-dispersal facts are much safer and more useful for the school project.', 'Observe without plucking leaves or ingesting plant parts. Wash hands after plant contact.', 'The seeds have thin, papery wings. These wings help the seeds move through the air, so the plant has its own simple way of spreading its seeds.',
    'published', NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
    common_name = EXCLUDED.common_name,
    other_common_names = EXCLUDED.other_common_names,
    scientific_name = EXCLUDED.scientific_name,
    family = EXCLUDED.family,
    category = EXCLUDED.category,
    identification_characteristics = EXCLUDED.identification_characteristics,
    identification_confidence = EXCLUDED.identification_confidence,
    native_origin = EXCLUDED.native_origin,
    distribution = EXCLUDED.distribution,
    campus_location = EXCLUDED.campus_location,
    flowers = EXCLUDED.flowers,
    flowering_season = EXCLUDED.flowering_season,
    fruits = EXCLUDED.fruits,
    fruiting_season = EXCLUDED.fruiting_season,
    uses = EXCLUDED.uses,
    traditional_medicinal_uses = EXCLUDED.traditional_medicinal_uses,
    safety_warnings = EXCLUDED.safety_warnings,
    interesting_facts = EXCLUDED.interesting_facts,
    status = EXCLUDED.status,
    updated_at = NOW();


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/yellow-bells-tecoma/plant_17_1.jpg', '/images/plants/plant_17_1.jpg', 'Yellow Bells (Tecoma stans (L.) Juss. ex Kunth) photographed on campus', 'Campus specimen #17 observation', true, 1, NOW()
FROM public.plants WHERE slug = 'yellow-bells-tecoma'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plants (
    slug, common_name, other_common_names, scientific_name, family,
    category, identification_characteristics, identification_confidence,
    native_origin, distribution, campus_location,
    flowers, flowering_season, fruits, fruiting_season,
    uses, traditional_medicinal_uses, safety_warnings, interesting_facts,
    status, created_at, updated_at
) VALUES (
    'red-leaved-mussaenda-mussaenda', 'Red-leaved Mussaenda', ARRAY['Ashanti Blood', 'Red Flag Bush']::text[], 'Mussaenda erythrophylla', 'Rubiaceae',
    'shrub', 'Characteristics Shrubby growth. Green leaves with prominent veins. Small flowers occur in clusters. Large bright-red, leaf-like structures surround the small flowers. The most interesting part The big red structures that look like petals are not actually the flower petals. They are modified parts of the calyx, called enlarged sepals. The actual flowers are much smaller and sit in the centre. They are usually pale or cream-white and star-shaped.', 'confirmed',
    'Indian Subcontinent and tropical regions.', 'Cultivated and naturalized across tropical India and campus grounds.', 'School Campus Gardens and Perimeter Grounds',
    'Seasonal inflorescences.', 'Seasonal flowering depending on climate.', 'Small seeds or berries.', 'Follows flowering season.',
    'Campus shade, landscape beautification, and student field study.', 'Documented in traditional Indian ethnobotany.', 'Observe without plucking leaves or ingesting plant parts. Wash hands after plant contact.', 'Documented by Azim Premji School students as part of the campus living biodiversity catalogue.',
    'published', NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
    common_name = EXCLUDED.common_name,
    other_common_names = EXCLUDED.other_common_names,
    scientific_name = EXCLUDED.scientific_name,
    family = EXCLUDED.family,
    category = EXCLUDED.category,
    identification_characteristics = EXCLUDED.identification_characteristics,
    identification_confidence = EXCLUDED.identification_confidence,
    native_origin = EXCLUDED.native_origin,
    distribution = EXCLUDED.distribution,
    campus_location = EXCLUDED.campus_location,
    flowers = EXCLUDED.flowers,
    flowering_season = EXCLUDED.flowering_season,
    fruits = EXCLUDED.fruits,
    fruiting_season = EXCLUDED.fruiting_season,
    uses = EXCLUDED.uses,
    traditional_medicinal_uses = EXCLUDED.traditional_medicinal_uses,
    safety_warnings = EXCLUDED.safety_warnings,
    interesting_facts = EXCLUDED.interesting_facts,
    status = EXCLUDED.status,
    updated_at = NOW();


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/red-leaved-mussaenda-mussaenda/plant_18_1.png', '/images/plants/plant_18_1.png', 'Red-leaved Mussaenda (Mussaenda erythrophylla) photographed on campus', 'Campus specimen #18 observation', true, 1, NOW()
FROM public.plants WHERE slug = 'red-leaved-mussaenda-mussaenda'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/red-leaved-mussaenda-mussaenda/plant_18_2.png', '/images/plants/plant_18_2.png', 'Red-leaved Mussaenda (Mussaenda erythrophylla) photographed on campus', 'Campus specimen #18 observation', false, 2, NOW()
FROM public.plants WHERE slug = 'red-leaved-mussaenda-mussaenda'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plants (
    slug, common_name, other_common_names, scientific_name, family,
    category, identification_characteristics, identification_confidence,
    native_origin, distribution, campus_location,
    flowers, flowering_season, fruits, fruiting_season,
    uses, traditional_medicinal_uses, safety_warnings, interesting_facts,
    status, created_at, updated_at
) VALUES (
    'purple-heart-tradescantia', 'Purple Heart', ARRAY['Purple Queen']::text[], 'Tradescantia pallidaOften cultivated as Tradescantia pallida ''Purpurea''', 'Commelinaceae',
    'herb', 'Characteristics for identification Long, narrow, pointed leaves. Leaves are deep purple or violet. Stems are also purple and somewhat fleshy. It usually grows low and spreads or trails along the ground. The purple colour becomes stronger when the plant gets plenty of sunlight.', 'confirmed',
    'Indian Subcontinent and tropical regions.', 'Cultivated and naturalized across tropical India and campus grounds.', 'School Campus Gardens and Perimeter Grounds',
    'Seasonal inflorescences.', 'Seasonal flowering depending on climate.', 'Small seeds or berries.', 'Follows flowering season.',
    'Campus shade, landscape beautification, and student field study.', 'Documented in traditional Indian ethnobotany.', 'Observe without plucking leaves or ingesting plant parts. Wash hands after plant contact.', 'Documented by Azim Premji School students as part of the campus living biodiversity catalogue.',
    'published', NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
    common_name = EXCLUDED.common_name,
    other_common_names = EXCLUDED.other_common_names,
    scientific_name = EXCLUDED.scientific_name,
    family = EXCLUDED.family,
    category = EXCLUDED.category,
    identification_characteristics = EXCLUDED.identification_characteristics,
    identification_confidence = EXCLUDED.identification_confidence,
    native_origin = EXCLUDED.native_origin,
    distribution = EXCLUDED.distribution,
    campus_location = EXCLUDED.campus_location,
    flowers = EXCLUDED.flowers,
    flowering_season = EXCLUDED.flowering_season,
    fruits = EXCLUDED.fruits,
    fruiting_season = EXCLUDED.fruiting_season,
    uses = EXCLUDED.uses,
    traditional_medicinal_uses = EXCLUDED.traditional_medicinal_uses,
    safety_warnings = EXCLUDED.safety_warnings,
    interesting_facts = EXCLUDED.interesting_facts,
    status = EXCLUDED.status,
    updated_at = NOW();


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/purple-heart-tradescantia/plant_19_1.png', '/images/plants/plant_19_1.png', 'Purple Heart (Tradescantia pallidaOften cultivated as Tradescantia pallida ''Purpurea'') photographed on campus', 'Campus specimen #19 observation', true, 1, NOW()
FROM public.plants WHERE slug = 'purple-heart-tradescantia'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plants (
    slug, common_name, other_common_names, scientific_name, family,
    category, identification_characteristics, identification_confidence,
    native_origin, distribution, campus_location,
    flowers, flowering_season, fruits, fruiting_season,
    uses, traditional_medicinal_uses, safety_warnings, interesting_facts,
    status, created_at, updated_at
) VALUES (
    'umbrella-tree-heptapleurum', 'Umbrella Tree', ARRAY['Octopus Tree']::text[], 'Heptapleurum actinophyllum', 'Araliaceae',
    'shrub', 'Characteristics for identification An evergreen tree or large shrub. It can have several trunks. Its leaves are made up of several glossy leaflets. The leaflets spread out from one point, almost like the spokes of an umbrella. Mature leaves usually have several leaflets, often around 7–16.', 'confirmed',
    'Indian Subcontinent and tropical regions.', 'Cultivated and naturalized across tropical India and campus grounds.', 'School Campus Gardens and Perimeter Grounds',
    'Seasonal inflorescences.', 'Seasonal flowering depending on climate.', 'Small seeds or berries.', 'Follows flowering season.',
    'Campus shade, landscape beautification, and student field study.', 'Documented in traditional Indian ethnobotany.', 'Observe without plucking leaves or ingesting plant parts. Wash hands after plant contact.', 'Documented by Azim Premji School students as part of the campus living biodiversity catalogue.',
    'published', NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
    common_name = EXCLUDED.common_name,
    other_common_names = EXCLUDED.other_common_names,
    scientific_name = EXCLUDED.scientific_name,
    family = EXCLUDED.family,
    category = EXCLUDED.category,
    identification_characteristics = EXCLUDED.identification_characteristics,
    identification_confidence = EXCLUDED.identification_confidence,
    native_origin = EXCLUDED.native_origin,
    distribution = EXCLUDED.distribution,
    campus_location = EXCLUDED.campus_location,
    flowers = EXCLUDED.flowers,
    flowering_season = EXCLUDED.flowering_season,
    fruits = EXCLUDED.fruits,
    fruiting_season = EXCLUDED.fruiting_season,
    uses = EXCLUDED.uses,
    traditional_medicinal_uses = EXCLUDED.traditional_medicinal_uses,
    safety_warnings = EXCLUDED.safety_warnings,
    interesting_facts = EXCLUDED.interesting_facts,
    status = EXCLUDED.status,
    updated_at = NOW();


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/umbrella-tree-heptapleurum/plant_20_1.png', '/images/plants/plant_20_1.png', 'Umbrella Tree (Heptapleurum actinophyllum) photographed on campus', 'Campus specimen #20 observation', true, 1, NOW()
FROM public.plants WHERE slug = 'umbrella-tree-heptapleurum'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plants (
    slug, common_name, other_common_names, scientific_name, family,
    category, identification_characteristics, identification_confidence,
    native_origin, distribution, campus_location,
    flowers, flowering_season, fruits, fruiting_season,
    uses, traditional_medicinal_uses, safety_warnings, interesting_facts,
    status, created_at, updated_at
) VALUES (
    'wild-plumeria-plumeria', 'Wild Plumeria', ARRAY['Bridal Bouquet', 'White Frangipani', 'Fiddle-leaf Plumeria']::text[], 'Plumeria pudica Jacq.', 'Apocynaceae',
    'shrub', 'Characteristics for identification The leaves are the biggest clue. Dark green and glossy. Unusually broad toward the end. They can look like little spoons or fiddles.', 'confirmed',
    'Indian Subcontinent and tropical regions.', 'Cultivated and naturalized across tropical India and campus grounds.', 'School Campus Gardens and Perimeter Grounds',
    'Seasonal inflorescences.', 'Seasonal flowering depending on climate.', 'Small seeds or berries.', 'Follows flowering season.',
    'Campus shade, landscape beautification, and student field study.', 'Documented in traditional Indian ethnobotany.', 'Observe without plucking leaves or ingesting plant parts. Wash hands after plant contact.', 'Documented by Azim Premji School students as part of the campus living biodiversity catalogue.',
    'published', NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
    common_name = EXCLUDED.common_name,
    other_common_names = EXCLUDED.other_common_names,
    scientific_name = EXCLUDED.scientific_name,
    family = EXCLUDED.family,
    category = EXCLUDED.category,
    identification_characteristics = EXCLUDED.identification_characteristics,
    identification_confidence = EXCLUDED.identification_confidence,
    native_origin = EXCLUDED.native_origin,
    distribution = EXCLUDED.distribution,
    campus_location = EXCLUDED.campus_location,
    flowers = EXCLUDED.flowers,
    flowering_season = EXCLUDED.flowering_season,
    fruits = EXCLUDED.fruits,
    fruiting_season = EXCLUDED.fruiting_season,
    uses = EXCLUDED.uses,
    traditional_medicinal_uses = EXCLUDED.traditional_medicinal_uses,
    safety_warnings = EXCLUDED.safety_warnings,
    interesting_facts = EXCLUDED.interesting_facts,
    status = EXCLUDED.status,
    updated_at = NOW();


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/wild-plumeria-plumeria/plant_21_1.png', '/images/plants/plant_21_1.png', 'Wild Plumeria (Plumeria pudica Jacq.) photographed on campus', 'Campus specimen #21 observation', true, 1, NOW()
FROM public.plants WHERE slug = 'wild-plumeria-plumeria'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/wild-plumeria-plumeria/plant_21_2.png', '/images/plants/plant_21_2.png', 'Wild Plumeria (Plumeria pudica Jacq.) photographed on campus', 'Campus specimen #21 observation', false, 2, NOW()
FROM public.plants WHERE slug = 'wild-plumeria-plumeria'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plants (
    slug, common_name, other_common_names, scientific_name, family,
    category, identification_characteristics, identification_confidence,
    native_origin, distribution, campus_location,
    flowers, flowering_season, fruits, fruiting_season,
    uses, traditional_medicinal_uses, safety_warnings, interesting_facts,
    status, created_at, updated_at
) VALUES (
    'yellow-double-hibiscus-hibiscus', 'Yellow Double Hibiscus', ARRAY['Yellow Hibiscus', 'Gudhal', 'Jaba']::text[], 'Hibiscus rosa-sinensis cultivar', 'Malvaceae',
    'shrub', 'Characteristics for identification Large bright-yellow flowers. Many layers of petals. The flower looks full and ruffled. Glossy green leaves. Woody, branching shrub. The double flower is the strongest clue.', 'confirmed',
    'Indian Subcontinent and tropical regions.', 'Cultivated and naturalized across tropical India and campus grounds.', 'School Campus Gardens and Perimeter Grounds',
    'Seasonal inflorescences.', 'Seasonal flowering depending on climate.', 'Small seeds or berries.', 'Follows flowering season.',
    'Campus shade, landscape beautification, and student field study.', 'Documented in traditional Indian ethnobotany.', 'Observe without plucking leaves or ingesting plant parts. Wash hands after plant contact.', 'Documented by Azim Premji School students as part of the campus living biodiversity catalogue.',
    'published', NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
    common_name = EXCLUDED.common_name,
    other_common_names = EXCLUDED.other_common_names,
    scientific_name = EXCLUDED.scientific_name,
    family = EXCLUDED.family,
    category = EXCLUDED.category,
    identification_characteristics = EXCLUDED.identification_characteristics,
    identification_confidence = EXCLUDED.identification_confidence,
    native_origin = EXCLUDED.native_origin,
    distribution = EXCLUDED.distribution,
    campus_location = EXCLUDED.campus_location,
    flowers = EXCLUDED.flowers,
    flowering_season = EXCLUDED.flowering_season,
    fruits = EXCLUDED.fruits,
    fruiting_season = EXCLUDED.fruiting_season,
    uses = EXCLUDED.uses,
    traditional_medicinal_uses = EXCLUDED.traditional_medicinal_uses,
    safety_warnings = EXCLUDED.safety_warnings,
    interesting_facts = EXCLUDED.interesting_facts,
    status = EXCLUDED.status,
    updated_at = NOW();


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/yellow-double-hibiscus-hibiscus/plant_22_1.png', '/images/plants/plant_22_1.png', 'Yellow Double Hibiscus (Hibiscus rosa-sinensis cultivar) photographed on campus', 'Campus specimen #22 observation', true, 1, NOW()
FROM public.plants WHERE slug = 'yellow-double-hibiscus-hibiscus'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plants (
    slug, common_name, other_common_names, scientific_name, family,
    category, identification_characteristics, identification_confidence,
    native_origin, distribution, campus_location,
    flowers, flowering_season, fruits, fruiting_season,
    uses, traditional_medicinal_uses, safety_warnings, interesting_facts,
    status, created_at, updated_at
) VALUES (
    'white-frangipani-plumeria', 'White Frangipani', ARRAY['Singapore Frangipani', 'Frangipani']::text[], 'Plumeria obtusa L.', 'Apocynaceae',
    'shrub', 'Characteristics for identification Thick, glossy, dark-green leaves. Leaves are broad and elongated. Leaf tips are rounded or blunt. White flowers with five petals. Yellow centre.', 'confirmed',
    'Indian Subcontinent and tropical regions.', 'Cultivated and naturalized across tropical India and campus grounds.', 'School Campus Gardens and Perimeter Grounds',
    'Seasonal inflorescences.', 'Seasonal flowering depending on climate.', 'Small seeds or berries.', 'Follows flowering season.',
    'Campus shade, landscape beautification, and student field study.', 'Documented in traditional Indian ethnobotany.', 'Observe without plucking leaves or ingesting plant parts. Wash hands after plant contact.', 'Documented by Azim Premji School students as part of the campus living biodiversity catalogue.',
    'published', NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
    common_name = EXCLUDED.common_name,
    other_common_names = EXCLUDED.other_common_names,
    scientific_name = EXCLUDED.scientific_name,
    family = EXCLUDED.family,
    category = EXCLUDED.category,
    identification_characteristics = EXCLUDED.identification_characteristics,
    identification_confidence = EXCLUDED.identification_confidence,
    native_origin = EXCLUDED.native_origin,
    distribution = EXCLUDED.distribution,
    campus_location = EXCLUDED.campus_location,
    flowers = EXCLUDED.flowers,
    flowering_season = EXCLUDED.flowering_season,
    fruits = EXCLUDED.fruits,
    fruiting_season = EXCLUDED.fruiting_season,
    uses = EXCLUDED.uses,
    traditional_medicinal_uses = EXCLUDED.traditional_medicinal_uses,
    safety_warnings = EXCLUDED.safety_warnings,
    interesting_facts = EXCLUDED.interesting_facts,
    status = EXCLUDED.status,
    updated_at = NOW();


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/white-frangipani-plumeria/plant_23_1.png', '/images/plants/plant_23_1.png', 'White Frangipani (Plumeria obtusa L.) photographed on campus', 'Campus specimen #23 observation', true, 1, NOW()
FROM public.plants WHERE slug = 'white-frangipani-plumeria'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/white-frangipani-plumeria/plant_23_2.png', '/images/plants/plant_23_2.png', 'White Frangipani (Plumeria obtusa L.) photographed on campus', 'Campus specimen #23 observation', false, 2, NOW()
FROM public.plants WHERE slug = 'white-frangipani-plumeria'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plants (
    slug, common_name, other_common_names, scientific_name, family,
    category, identification_characteristics, identification_confidence,
    native_origin, distribution, campus_location,
    flowers, flowering_season, fruits, fruiting_season,
    uses, traditional_medicinal_uses, safety_warnings, interesting_facts,
    status, created_at, updated_at
) VALUES (
    'gulmohar-delonix', 'Gulmohar', ARRAY['Flame Tree', 'Royal Poinciana']::text[], 'Delonix regia', 'Fabaceae',
    'tree', 'Characteristics for identification Very fine, feathery leaves. Leaves are bipinnate, meaning they are divided twice. Many tiny leaflets are arranged along smaller branches. Mature trees can have a broad, spreading crown. Large red or orange-red flowers appear when the tree blooms. Long, flat, woody seed pods develop after flowering. Copperpod can have similar feathery leaves, so the red/orange flowers or large pods help confirm Gulmohar.', 'confirmed',
    'Indian Subcontinent and tropical regions.', 'Cultivated and naturalized across tropical India and campus grounds.', 'School Campus Gardens and Perimeter Grounds',
    'Seasonal inflorescences.', 'Seasonal flowering depending on climate.', 'Small seeds or berries.', 'Follows flowering season.',
    'Campus shade, landscape beautification, and student field study.', 'Documented in traditional Indian ethnobotany.', 'Observe without plucking leaves or ingesting plant parts. Wash hands after plant contact.', 'Documented by Azim Premji School students as part of the campus living biodiversity catalogue.',
    'published', NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
    common_name = EXCLUDED.common_name,
    other_common_names = EXCLUDED.other_common_names,
    scientific_name = EXCLUDED.scientific_name,
    family = EXCLUDED.family,
    category = EXCLUDED.category,
    identification_characteristics = EXCLUDED.identification_characteristics,
    identification_confidence = EXCLUDED.identification_confidence,
    native_origin = EXCLUDED.native_origin,
    distribution = EXCLUDED.distribution,
    campus_location = EXCLUDED.campus_location,
    flowers = EXCLUDED.flowers,
    flowering_season = EXCLUDED.flowering_season,
    fruits = EXCLUDED.fruits,
    fruiting_season = EXCLUDED.fruiting_season,
    uses = EXCLUDED.uses,
    traditional_medicinal_uses = EXCLUDED.traditional_medicinal_uses,
    safety_warnings = EXCLUDED.safety_warnings,
    interesting_facts = EXCLUDED.interesting_facts,
    status = EXCLUDED.status,
    updated_at = NOW();


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/gulmohar-delonix/plant_24_1.png', '/images/plants/plant_24_1.png', 'Gulmohar (Delonix regia) photographed on campus', 'Campus specimen #24 observation', true, 1, NOW()
FROM public.plants WHERE slug = 'gulmohar-delonix'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plants (
    slug, common_name, other_common_names, scientific_name, family,
    category, identification_characteristics, identification_confidence,
    native_origin, distribution, campus_location,
    flowers, flowering_season, fruits, fruiting_season,
    uses, traditional_medicinal_uses, safety_warnings, interesting_facts,
    status, created_at, updated_at
) VALUES (
    'red-powderpuff-calliandra', 'Red Powderpuff', ARRAY['Scarlet Powderpuff', 'Calliandra', 'Blood-red Tassel Flower']::text[], 'Calliandra haematocephala Hassk.', 'Fabaceae (Legume family / Mimosoideae)',
    'shrub', 'Evergreen branched shrub with bipinnate compound foliage. Recognized by its hemispherical to spherical scarlet powderpuff flowerheads composed of hundreds of brilliant red silky stamens.', 'confirmed',
    'Tropical South America (Bolivia, Brazil)', 'Cultivated and naturalized across tropical India and campus grounds.', 'School Campus Gardens and Perimeter Grounds',
    'Brilliant crimson, pom-pom-like inflorescences consisting of numerous protruding red stamens.', 'October – March (peak winter blooming)', 'Flat, oblong woody pods that dehisce elastically from tip to base to fling seeds.', 'January – April',
    'Prized ornamental hedge, border shrub, and vibrant botanical garden accent.', 'Bark extracts traditionally cited for astringent and mild antimicrobial qualities.', 'Generally non-toxic; hard seeds should not be ingested.', 'What look like flower petals are actually hundreds of elongated crimson stamens forming the fluffy sphere.',
    'published', NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
    common_name = EXCLUDED.common_name,
    other_common_names = EXCLUDED.other_common_names,
    scientific_name = EXCLUDED.scientific_name,
    family = EXCLUDED.family,
    category = EXCLUDED.category,
    identification_characteristics = EXCLUDED.identification_characteristics,
    identification_confidence = EXCLUDED.identification_confidence,
    native_origin = EXCLUDED.native_origin,
    distribution = EXCLUDED.distribution,
    campus_location = EXCLUDED.campus_location,
    flowers = EXCLUDED.flowers,
    flowering_season = EXCLUDED.flowering_season,
    fruits = EXCLUDED.fruits,
    fruiting_season = EXCLUDED.fruiting_season,
    uses = EXCLUDED.uses,
    traditional_medicinal_uses = EXCLUDED.traditional_medicinal_uses,
    safety_warnings = EXCLUDED.safety_warnings,
    interesting_facts = EXCLUDED.interesting_facts,
    status = EXCLUDED.status,
    updated_at = NOW();


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/red-powderpuff-calliandra/plant_25_1.png', '/images/plants/plant_25_1.png', 'Red Powderpuff (Calliandra haematocephala Hassk.) photographed on campus', 'Campus specimen #25 observation', true, 1, NOW()
FROM public.plants WHERE slug = 'red-powderpuff-calliandra'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plants (
    slug, common_name, other_common_names, scientific_name, family,
    category, identification_characteristics, identification_confidence,
    native_origin, distribution, campus_location,
    flowers, flowering_season, fruits, fruiting_season,
    uses, traditional_medicinal_uses, safety_warnings, interesting_facts,
    status, created_at, updated_at
) VALUES (
    'porcupine-flower-barleria', 'Porcupine Flower', ARRAY['Vajradanti']::text[], 'Barleria prionitis L.', 'Acanthaceae',
    'shrub', 'Characteristics for identification Small, bushy shrub. Opposite green leaves. Yellow or orange-yellow tubular flowers. Those spines are one of the best identification clues.', 'confirmed',
    'Indian Subcontinent and tropical regions.', 'Cultivated and naturalized across tropical India and campus grounds.', 'School Campus Gardens and Perimeter Grounds',
    'Seasonal inflorescences.', 'Seasonal flowering depending on climate.', 'Small seeds or berries.', 'Follows flowering season.',
    'Campus shade, landscape beautification, and student field study.', 'Documented in traditional Indian ethnobotany.', 'Observe without plucking leaves or ingesting plant parts. Wash hands after plant contact.', 'Documented by Azim Premji School students as part of the campus living biodiversity catalogue.',
    'published', NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
    common_name = EXCLUDED.common_name,
    other_common_names = EXCLUDED.other_common_names,
    scientific_name = EXCLUDED.scientific_name,
    family = EXCLUDED.family,
    category = EXCLUDED.category,
    identification_characteristics = EXCLUDED.identification_characteristics,
    identification_confidence = EXCLUDED.identification_confidence,
    native_origin = EXCLUDED.native_origin,
    distribution = EXCLUDED.distribution,
    campus_location = EXCLUDED.campus_location,
    flowers = EXCLUDED.flowers,
    flowering_season = EXCLUDED.flowering_season,
    fruits = EXCLUDED.fruits,
    fruiting_season = EXCLUDED.fruiting_season,
    uses = EXCLUDED.uses,
    traditional_medicinal_uses = EXCLUDED.traditional_medicinal_uses,
    safety_warnings = EXCLUDED.safety_warnings,
    interesting_facts = EXCLUDED.interesting_facts,
    status = EXCLUDED.status,
    updated_at = NOW();


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/porcupine-flower-barleria/plant_26_1.png', '/images/plants/plant_26_1.png', 'Porcupine Flower (Barleria prionitis L.) photographed on campus', 'Campus specimen #26 observation', true, 1, NOW()
FROM public.plants WHERE slug = 'porcupine-flower-barleria'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plants (
    slug, common_name, other_common_names, scientific_name, family,
    category, identification_characteristics, identification_confidence,
    native_origin, distribution, campus_location,
    flowers, flowering_season, fruits, fruiting_season,
    uses, traditional_medicinal_uses, safety_warnings, interesting_facts,
    status, created_at, updated_at
) VALUES (
    'karonda-carissa', 'Karonda', ARRAY['Bengal Currant', 'Lasoda']::text[], 'Carissa carandas L.', 'Apocynaceae',
    'shrub', 'Characteristics for identification Evergreen shrub or small tree. Dense, bushy growth. Glossy, leathery leaves. Leaves occur opposite each other. Woody, branching stems. Sharp spines at the branches or nodes. The photograph does not show the spines clearly, so the identification was recorded as moderate rather than certain.', 'confirmed',
    'Indian Subcontinent and tropical regions.', 'Cultivated and naturalized across tropical India and campus grounds.', 'School Campus Gardens and Perimeter Grounds',
    'Seasonal inflorescences.', 'Seasonal flowering depending on climate.', 'Small seeds or berries.', 'Follows flowering season.',
    'Campus shade, landscape beautification, and student field study.', 'Documented in traditional Indian ethnobotany.', 'Observe without plucking leaves or ingesting plant parts. Wash hands after plant contact.', 'Documented by Azim Premji School students as part of the campus living biodiversity catalogue.',
    'published', NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
    common_name = EXCLUDED.common_name,
    other_common_names = EXCLUDED.other_common_names,
    scientific_name = EXCLUDED.scientific_name,
    family = EXCLUDED.family,
    category = EXCLUDED.category,
    identification_characteristics = EXCLUDED.identification_characteristics,
    identification_confidence = EXCLUDED.identification_confidence,
    native_origin = EXCLUDED.native_origin,
    distribution = EXCLUDED.distribution,
    campus_location = EXCLUDED.campus_location,
    flowers = EXCLUDED.flowers,
    flowering_season = EXCLUDED.flowering_season,
    fruits = EXCLUDED.fruits,
    fruiting_season = EXCLUDED.fruiting_season,
    uses = EXCLUDED.uses,
    traditional_medicinal_uses = EXCLUDED.traditional_medicinal_uses,
    safety_warnings = EXCLUDED.safety_warnings,
    interesting_facts = EXCLUDED.interesting_facts,
    status = EXCLUDED.status,
    updated_at = NOW();


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/karonda-carissa/plant_27_1.png', '/images/plants/plant_27_1.png', 'Karonda (Carissa carandas L.) photographed on campus', 'Campus specimen #27 observation', true, 1, NOW()
FROM public.plants WHERE slug = 'karonda-carissa'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plants (
    slug, common_name, other_common_names, scientific_name, family,
    category, identification_characteristics, identification_confidence,
    native_origin, distribution, campus_location,
    flowers, flowering_season, fruits, fruiting_season,
    uses, traditional_medicinal_uses, safety_warnings, interesting_facts,
    status, created_at, updated_at
) VALUES (
    'copperleaf-acalypha', 'Copperleaf', ARRAY['Firestorm', 'Dwarf Acalypha']::text[], 'Acalypha godseffiana ''Heterophylla''', 'Euphorbiaceae',
    'shrub', 'Characteristics for identification Narrow green leaves. Leaves have strongly wavy or ruffled edges. The edges have a noticeable pink or reddish colour. Leaves grow alternately along woody stems. Bushy shrub. The pink, wavy leaf margin is the best clue.', 'confirmed',
    'Indian Subcontinent and tropical regions.', 'Cultivated and naturalized across tropical India and campus grounds.', 'School Campus Gardens and Perimeter Grounds',
    'Seasonal inflorescences.', 'Seasonal flowering depending on climate.', 'Small seeds or berries.', 'Follows flowering season.',
    'Campus shade, landscape beautification, and student field study.', 'Documented in traditional Indian ethnobotany.', 'Observe without plucking leaves or ingesting plant parts. Wash hands after plant contact.', 'Documented by Azim Premji School students as part of the campus living biodiversity catalogue.',
    'published', NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
    common_name = EXCLUDED.common_name,
    other_common_names = EXCLUDED.other_common_names,
    scientific_name = EXCLUDED.scientific_name,
    family = EXCLUDED.family,
    category = EXCLUDED.category,
    identification_characteristics = EXCLUDED.identification_characteristics,
    identification_confidence = EXCLUDED.identification_confidence,
    native_origin = EXCLUDED.native_origin,
    distribution = EXCLUDED.distribution,
    campus_location = EXCLUDED.campus_location,
    flowers = EXCLUDED.flowers,
    flowering_season = EXCLUDED.flowering_season,
    fruits = EXCLUDED.fruits,
    fruiting_season = EXCLUDED.fruiting_season,
    uses = EXCLUDED.uses,
    traditional_medicinal_uses = EXCLUDED.traditional_medicinal_uses,
    safety_warnings = EXCLUDED.safety_warnings,
    interesting_facts = EXCLUDED.interesting_facts,
    status = EXCLUDED.status,
    updated_at = NOW();


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/copperleaf-acalypha/plant_28_1.png', '/images/plants/plant_28_1.png', 'Copperleaf (Acalypha godseffiana ''Heterophylla'') photographed on campus', 'Campus specimen #28 observation', true, 1, NOW()
FROM public.plants WHERE slug = 'copperleaf-acalypha'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plants (
    slug, common_name, other_common_names, scientific_name, family,
    category, identification_characteristics, identification_confidence,
    native_origin, distribution, campus_location,
    flowers, flowering_season, fruits, fruiting_season,
    uses, traditional_medicinal_uses, safety_warnings, interesting_facts,
    status, created_at, updated_at
) VALUES (
    'indian-bay-leaf-syzygium', 'Indian Bay Leaf', ARRAY['Indonesian Bay Leaf', 'Salam']::text[], 'Syzygium polyanthum (Wight) Walp.', 'Myrtaceae',
    'herb', 'Important identification note This one is not fully confirmed. The three photographs appear to show the same plant, and they strongly fit the Syzygium genus, but Syzygium polyanthum is only a moderate-confidence identification because several Syzygium species look similar. Characteristics Dense evergreen foliage. Simple, glossy leaves. Leaves are narrow and pointed. Leaves grow in opposite pairs. Woody branching stems. Small cream-white flowers in clusters.', 'confirmed',
    'Indian Subcontinent and tropical regions.', 'Cultivated and naturalized across tropical India and campus grounds.', 'School Campus Gardens and Perimeter Grounds',
    'Seasonal inflorescences.', 'Seasonal flowering depending on climate.', 'Small seeds or berries.', 'Follows flowering season.',
    'Campus shade, landscape beautification, and student field study.', 'Documented in traditional Indian ethnobotany.', 'Observe without plucking leaves or ingesting plant parts. Wash hands after plant contact.', 'Documented by Azim Premji School students as part of the campus living biodiversity catalogue.',
    'published', NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
    common_name = EXCLUDED.common_name,
    other_common_names = EXCLUDED.other_common_names,
    scientific_name = EXCLUDED.scientific_name,
    family = EXCLUDED.family,
    category = EXCLUDED.category,
    identification_characteristics = EXCLUDED.identification_characteristics,
    identification_confidence = EXCLUDED.identification_confidence,
    native_origin = EXCLUDED.native_origin,
    distribution = EXCLUDED.distribution,
    campus_location = EXCLUDED.campus_location,
    flowers = EXCLUDED.flowers,
    flowering_season = EXCLUDED.flowering_season,
    fruits = EXCLUDED.fruits,
    fruiting_season = EXCLUDED.fruiting_season,
    uses = EXCLUDED.uses,
    traditional_medicinal_uses = EXCLUDED.traditional_medicinal_uses,
    safety_warnings = EXCLUDED.safety_warnings,
    interesting_facts = EXCLUDED.interesting_facts,
    status = EXCLUDED.status,
    updated_at = NOW();


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/indian-bay-leaf-syzygium/plant_29_1.png', '/images/plants/plant_29_1.png', 'Indian Bay Leaf (Syzygium polyanthum (Wight) Walp.) photographed on campus', 'Campus specimen #29 observation', true, 1, NOW()
FROM public.plants WHERE slug = 'indian-bay-leaf-syzygium'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/indian-bay-leaf-syzygium/plant_29_2.png', '/images/plants/plant_29_2.png', 'Indian Bay Leaf (Syzygium polyanthum (Wight) Walp.) photographed on campus', 'Campus specimen #29 observation', false, 2, NOW()
FROM public.plants WHERE slug = 'indian-bay-leaf-syzygium'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/indian-bay-leaf-syzygium/plant_29_3.png', '/images/plants/plant_29_3.png', 'Indian Bay Leaf (Syzygium polyanthum (Wight) Walp.) photographed on campus', 'Campus specimen #29 observation', false, 3, NOW()
FROM public.plants WHERE slug = 'indian-bay-leaf-syzygium'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plants (
    slug, common_name, other_common_names, scientific_name, family,
    category, identification_characteristics, identification_confidence,
    native_origin, distribution, campus_location,
    flowers, flowering_season, fruits, fruiting_season,
    uses, traditional_medicinal_uses, safety_warnings, interesting_facts,
    status, created_at, updated_at
) VALUES (
    'sessile-joyweed-alternanthera', 'Sessile Joyweed', ARRAY['Dwarf Copperleaf']::text[], 'Alternanthera sessilis', 'Amaranthaceae',
    'creeper', 'Characteristics Small, low-growing herb. Stems can spread along the ground. Leaves occur in opposite pairs. Leaves are simple, smooth-edged and somewhat fleshy. Small white or pale flowers occur in compact round clusters where the leaves meet the stem.', 'confirmed',
    'Indian Subcontinent and tropical regions.', 'Cultivated and naturalized across tropical India and campus grounds.', 'School Campus Gardens and Perimeter Grounds',
    'Seasonal inflorescences.', 'Seasonal flowering depending on climate.', 'Small seeds or berries.', 'Follows flowering season.',
    'Campus shade, landscape beautification, and student field study.', 'Documented in traditional Indian ethnobotany.', 'Observe without plucking leaves or ingesting plant parts. Wash hands after plant contact.', 'Documented by Azim Premji School students as part of the campus living biodiversity catalogue.',
    'published', NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
    common_name = EXCLUDED.common_name,
    other_common_names = EXCLUDED.other_common_names,
    scientific_name = EXCLUDED.scientific_name,
    family = EXCLUDED.family,
    category = EXCLUDED.category,
    identification_characteristics = EXCLUDED.identification_characteristics,
    identification_confidence = EXCLUDED.identification_confidence,
    native_origin = EXCLUDED.native_origin,
    distribution = EXCLUDED.distribution,
    campus_location = EXCLUDED.campus_location,
    flowers = EXCLUDED.flowers,
    flowering_season = EXCLUDED.flowering_season,
    fruits = EXCLUDED.fruits,
    fruiting_season = EXCLUDED.fruiting_season,
    uses = EXCLUDED.uses,
    traditional_medicinal_uses = EXCLUDED.traditional_medicinal_uses,
    safety_warnings = EXCLUDED.safety_warnings,
    interesting_facts = EXCLUDED.interesting_facts,
    status = EXCLUDED.status,
    updated_at = NOW();


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/sessile-joyweed-alternanthera/plant_30_1.png', '/images/plants/plant_30_1.png', 'Sessile Joyweed (Alternanthera sessilis) photographed on campus', 'Campus specimen #30 observation', true, 1, NOW()
FROM public.plants WHERE slug = 'sessile-joyweed-alternanthera'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/sessile-joyweed-alternanthera/plant_30_2.png', '/images/plants/plant_30_2.png', 'Sessile Joyweed (Alternanthera sessilis) photographed on campus', 'Campus specimen #30 observation', false, 2, NOW()
FROM public.plants WHERE slug = 'sessile-joyweed-alternanthera'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plants (
    slug, common_name, other_common_names, scientific_name, family,
    category, identification_characteristics, identification_confidence,
    native_origin, distribution, campus_location,
    flowers, flowering_season, fruits, fruiting_season,
    uses, traditional_medicinal_uses, safety_warnings, interesting_facts,
    status, created_at, updated_at
) VALUES (
    'custard-apple-annona', 'Custard Apple', ARRAY['Sugar Apple', 'Sweetsop', 'Sitaphal', 'Sharifa']::text[], 'Annona squamosa L.', 'Annonaceae',
    'shrub', 'Characteristics Small tree or large shrub. Smooth green leaves. Leaves are oval to lance-shaped.', 'confirmed',
    'Indian Subcontinent and tropical regions.', 'Cultivated and naturalized across tropical India and campus grounds.', 'School Campus Gardens and Perimeter Grounds',
    'Seasonal inflorescences.', 'Seasonal flowering depending on climate.', 'Small seeds or berries.', 'Follows flowering season.',
    'Campus shade, landscape beautification, and student field study.', 'Documented in traditional Indian ethnobotany.', 'Observe without plucking leaves or ingesting plant parts. Wash hands after plant contact.', 'Documented by Azim Premji School students as part of the campus living biodiversity catalogue.',
    'published', NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
    common_name = EXCLUDED.common_name,
    other_common_names = EXCLUDED.other_common_names,
    scientific_name = EXCLUDED.scientific_name,
    family = EXCLUDED.family,
    category = EXCLUDED.category,
    identification_characteristics = EXCLUDED.identification_characteristics,
    identification_confidence = EXCLUDED.identification_confidence,
    native_origin = EXCLUDED.native_origin,
    distribution = EXCLUDED.distribution,
    campus_location = EXCLUDED.campus_location,
    flowers = EXCLUDED.flowers,
    flowering_season = EXCLUDED.flowering_season,
    fruits = EXCLUDED.fruits,
    fruiting_season = EXCLUDED.fruiting_season,
    uses = EXCLUDED.uses,
    traditional_medicinal_uses = EXCLUDED.traditional_medicinal_uses,
    safety_warnings = EXCLUDED.safety_warnings,
    interesting_facts = EXCLUDED.interesting_facts,
    status = EXCLUDED.status,
    updated_at = NOW();


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/custard-apple-annona/plant_31_1.png', '/images/plants/plant_31_1.png', 'Custard Apple (Annona squamosa L.) photographed on campus', 'Campus specimen #31 observation', true, 1, NOW()
FROM public.plants WHERE slug = 'custard-apple-annona'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/custard-apple-annona/plant_31_2.png', '/images/plants/plant_31_2.png', 'Custard Apple (Annona squamosa L.) photographed on campus', 'Campus specimen #31 observation', false, 2, NOW()
FROM public.plants WHERE slug = 'custard-apple-annona'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plants (
    slug, common_name, other_common_names, scientific_name, family,
    category, identification_characteristics, identification_confidence,
    native_origin, distribution, campus_location,
    flowers, flowering_season, fruits, fruiting_season,
    uses, traditional_medicinal_uses, safety_warnings, interesting_facts,
    status, created_at, updated_at
) VALUES (
    'fukien-tea-ehretia', 'Fukien Tea', ARRAY['Philippine Tea', 'Carmona']::text[], 'Ehretia microphylla Lam.', 'Boraginaceae',
    'shrub', 'Characteristics Dense, heavily branched shrub. Small, thick, glossy leaves. Leaves have a slightly wrinkled or bumpy surface. Woody branches. Compact growth. Seeing white flowers together with red berries would make the identification much stronger.', 'confirmed',
    'Indian Subcontinent and tropical regions.', 'Cultivated and naturalized across tropical India and campus grounds.', 'School Campus Gardens and Perimeter Grounds',
    'Seasonal inflorescences.', 'Seasonal flowering depending on climate.', 'Small seeds or berries.', 'Follows flowering season.',
    'Campus shade, landscape beautification, and student field study.', 'Documented in traditional Indian ethnobotany.', 'Observe without plucking leaves or ingesting plant parts. Wash hands after plant contact.', 'Documented by Azim Premji School students as part of the campus living biodiversity catalogue.',
    'published', NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
    common_name = EXCLUDED.common_name,
    other_common_names = EXCLUDED.other_common_names,
    scientific_name = EXCLUDED.scientific_name,
    family = EXCLUDED.family,
    category = EXCLUDED.category,
    identification_characteristics = EXCLUDED.identification_characteristics,
    identification_confidence = EXCLUDED.identification_confidence,
    native_origin = EXCLUDED.native_origin,
    distribution = EXCLUDED.distribution,
    campus_location = EXCLUDED.campus_location,
    flowers = EXCLUDED.flowers,
    flowering_season = EXCLUDED.flowering_season,
    fruits = EXCLUDED.fruits,
    fruiting_season = EXCLUDED.fruiting_season,
    uses = EXCLUDED.uses,
    traditional_medicinal_uses = EXCLUDED.traditional_medicinal_uses,
    safety_warnings = EXCLUDED.safety_warnings,
    interesting_facts = EXCLUDED.interesting_facts,
    status = EXCLUDED.status,
    updated_at = NOW();


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/fukien-tea-ehretia/plant_32_1.png', '/images/plants/plant_32_1.png', 'Fukien Tea (Ehretia microphylla Lam.) photographed on campus', 'Campus specimen #32 observation', true, 1, NOW()
FROM public.plants WHERE slug = 'fukien-tea-ehretia'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plants (
    slug, common_name, other_common_names, scientific_name, family,
    category, identification_characteristics, identification_confidence,
    native_origin, distribution, campus_location,
    flowers, flowering_season, fruits, fruiting_season,
    uses, traditional_medicinal_uses, safety_warnings, interesting_facts,
    status, created_at, updated_at
) VALUES (
    'subabul-leucaena', 'Subabul', ARRAY['Subabool', 'Lead Tree', 'Leucaena', 'Wild Tamarind']::text[], 'Leucaena leucocephala', 'Fabaceae',
    'shrub', 'Characteristics Small to medium tree or shrub. Very fine, feathery leaves. Leaves are bipinnate. Tiny leaflets give the leaves a fern-like appearance. Small white or cream flower heads are round. Long, flat seed pods develop later.', 'confirmed',
    'Indian Subcontinent and tropical regions.', 'Cultivated and naturalized across tropical India and campus grounds.', 'School Campus Gardens and Perimeter Grounds',
    'Seasonal inflorescences.', 'Seasonal flowering depending on climate.', 'Small seeds or berries.', 'Follows flowering season.',
    'Campus shade, landscape beautification, and student field study.', 'Documented in traditional Indian ethnobotany.', 'Observe without plucking leaves or ingesting plant parts. Wash hands after plant contact.', 'Documented by Azim Premji School students as part of the campus living biodiversity catalogue.',
    'published', NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
    common_name = EXCLUDED.common_name,
    other_common_names = EXCLUDED.other_common_names,
    scientific_name = EXCLUDED.scientific_name,
    family = EXCLUDED.family,
    category = EXCLUDED.category,
    identification_characteristics = EXCLUDED.identification_characteristics,
    identification_confidence = EXCLUDED.identification_confidence,
    native_origin = EXCLUDED.native_origin,
    distribution = EXCLUDED.distribution,
    campus_location = EXCLUDED.campus_location,
    flowers = EXCLUDED.flowers,
    flowering_season = EXCLUDED.flowering_season,
    fruits = EXCLUDED.fruits,
    fruiting_season = EXCLUDED.fruiting_season,
    uses = EXCLUDED.uses,
    traditional_medicinal_uses = EXCLUDED.traditional_medicinal_uses,
    safety_warnings = EXCLUDED.safety_warnings,
    interesting_facts = EXCLUDED.interesting_facts,
    status = EXCLUDED.status,
    updated_at = NOW();


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/subabul-leucaena/plant_33_1.png', '/images/plants/plant_33_1.png', 'Subabul (Leucaena leucocephala) photographed on campus', 'Campus specimen #33 observation', true, 1, NOW()
FROM public.plants WHERE slug = 'subabul-leucaena'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/subabul-leucaena/plant_33_2.png', '/images/plants/plant_33_2.png', 'Subabul (Leucaena leucocephala) photographed on campus', 'Campus specimen #33 observation', false, 2, NOW()
FROM public.plants WHERE slug = 'subabul-leucaena'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plants (
    slug, common_name, other_common_names, scientific_name, family,
    category, identification_characteristics, identification_confidence,
    native_origin, distribution, campus_location,
    flowers, flowering_season, fruits, fruiting_season,
    uses, traditional_medicinal_uses, safety_warnings, interesting_facts,
    status, created_at, updated_at
) VALUES (
    'indian-cherry-cordia', 'Indian Cherry', ARRAY['Lasora', 'Lasoda', 'Bhokar', 'Gonda']::text[], 'Cordia dichotoma G.Forst.', 'Boraginaceae',
    'shrub', 'Characteristics Small to medium woody tree or shrub. Long, drooping branches. Broad green leaves. Leaves are oval to elliptical. Margins can be slightly wavy. Veins are quite visible.', 'confirmed',
    'Indian Subcontinent and tropical regions.', 'Cultivated and naturalized across tropical India and campus grounds.', 'School Campus Gardens and Perimeter Grounds',
    'Seasonal inflorescences.', 'Seasonal flowering depending on climate.', 'Small seeds or berries.', 'Follows flowering season.',
    'Campus shade, landscape beautification, and student field study.', 'Documented in traditional Indian ethnobotany.', 'Observe without plucking leaves or ingesting plant parts. Wash hands after plant contact.', 'Documented by Azim Premji School students as part of the campus living biodiversity catalogue.',
    'published', NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
    common_name = EXCLUDED.common_name,
    other_common_names = EXCLUDED.other_common_names,
    scientific_name = EXCLUDED.scientific_name,
    family = EXCLUDED.family,
    category = EXCLUDED.category,
    identification_characteristics = EXCLUDED.identification_characteristics,
    identification_confidence = EXCLUDED.identification_confidence,
    native_origin = EXCLUDED.native_origin,
    distribution = EXCLUDED.distribution,
    campus_location = EXCLUDED.campus_location,
    flowers = EXCLUDED.flowers,
    flowering_season = EXCLUDED.flowering_season,
    fruits = EXCLUDED.fruits,
    fruiting_season = EXCLUDED.fruiting_season,
    uses = EXCLUDED.uses,
    traditional_medicinal_uses = EXCLUDED.traditional_medicinal_uses,
    safety_warnings = EXCLUDED.safety_warnings,
    interesting_facts = EXCLUDED.interesting_facts,
    status = EXCLUDED.status,
    updated_at = NOW();


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/indian-cherry-cordia/plant_34_1.png', '/images/plants/plant_34_1.png', 'Indian Cherry (Cordia dichotoma G.Forst.) photographed on campus', 'Campus specimen #34 observation', true, 1, NOW()
FROM public.plants WHERE slug = 'indian-cherry-cordia'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plants (
    slug, common_name, other_common_names, scientific_name, family,
    category, identification_characteristics, identification_confidence,
    native_origin, distribution, campus_location,
    flowers, flowering_season, fruits, fruiting_season,
    uses, traditional_medicinal_uses, safety_warnings, interesting_facts,
    status, created_at, updated_at
) VALUES (
    'fishtail-palm-caryota', 'Fishtail Palm', ARRAY['Clustering Fishtail Palm', 'Tufted Fishtail Palm', 'Burmese Fishtail Palm']::text[], 'Caryota mitis Lour.', 'Arecaceae (Palm family)',
    'palm', 'Multi-stemmed clustering palm with bipinnate fronds bearing uniquely shaped, jagged, wedge-like leaflets resembling the tail fins of fish.', 'confirmed',
    'Southeast Asia and Indo-Malaya', 'Cultivated and naturalized across tropical India and campus grounds.', 'School Campus Gardens and Perimeter Grounds',
    'Pendulous, cascading horsetail-like inflorescences that develop from the top nodes downward.', 'April – September', 'Round drupes turning reddish-purple to black when mature, borne in dense hanging ropes.', 'September – January',
    'Architectural landscaping, shaded avenue borders, and tropical accent plantings.', 'Stem starch and fibers traditionally utilized in native regions.', 'The fruit pulp and sap contain high levels of needle-like calcium oxalate crystals which cause severe skin stinging and burning if touched or eaten. Students must never handle ripe fallen fruits.', 'Caryota is monocarpic on individual stems: once an individual stem finishes flowering from top to bottom, that stem dies while new suckers continue to grow from the base.',
    'published', NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
    common_name = EXCLUDED.common_name,
    other_common_names = EXCLUDED.other_common_names,
    scientific_name = EXCLUDED.scientific_name,
    family = EXCLUDED.family,
    category = EXCLUDED.category,
    identification_characteristics = EXCLUDED.identification_characteristics,
    identification_confidence = EXCLUDED.identification_confidence,
    native_origin = EXCLUDED.native_origin,
    distribution = EXCLUDED.distribution,
    campus_location = EXCLUDED.campus_location,
    flowers = EXCLUDED.flowers,
    flowering_season = EXCLUDED.flowering_season,
    fruits = EXCLUDED.fruits,
    fruiting_season = EXCLUDED.fruiting_season,
    uses = EXCLUDED.uses,
    traditional_medicinal_uses = EXCLUDED.traditional_medicinal_uses,
    safety_warnings = EXCLUDED.safety_warnings,
    interesting_facts = EXCLUDED.interesting_facts,
    status = EXCLUDED.status,
    updated_at = NOW();


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/fishtail-palm-caryota/plant_35_1.png', '/images/plants/plant_35_1.png', 'Fishtail Palm (Caryota mitis Lour.) photographed on campus', 'Campus specimen #35 observation', true, 1, NOW()
FROM public.plants WHERE slug = 'fishtail-palm-caryota'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plants (
    slug, common_name, other_common_names, scientific_name, family,
    category, identification_characteristics, identification_confidence,
    native_origin, distribution, campus_location,
    flowers, flowering_season, fruits, fruiting_season,
    uses, traditional_medicinal_uses, safety_warnings, interesting_facts,
    status, created_at, updated_at
) VALUES (
    'japanese-pittosporum-pittosporum', 'Japanese Pittosporum', ARRAY['Japanese Mock Orange', 'Japanese Cheesewood', 'Tobira']::text[], 'Pittosporum tobira', 'Pittosporaceae',
    'shrub', 'Characteristics Evergreen shrub or small tree. Thick, leathery leaves. Leaves are glossy and dark green. Leaves are oval or spoon-shaped. Leaves are gathered in dense clusters at the ends of branches. The cluster of thick leaves at the branch tips is one of the best clues.', 'confirmed',
    'Indian Subcontinent and tropical regions.', 'Cultivated and naturalized across tropical India and campus grounds.', 'School Campus Gardens and Perimeter Grounds',
    'Seasonal inflorescences.', 'Seasonal flowering depending on climate.', 'Small seeds or berries.', 'Follows flowering season.',
    'Campus shade, landscape beautification, and student field study.', 'Documented in traditional Indian ethnobotany.', 'Observe without plucking leaves or ingesting plant parts. Wash hands after plant contact.', 'Documented by Azim Premji School students as part of the campus living biodiversity catalogue.',
    'published', NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
    common_name = EXCLUDED.common_name,
    other_common_names = EXCLUDED.other_common_names,
    scientific_name = EXCLUDED.scientific_name,
    family = EXCLUDED.family,
    category = EXCLUDED.category,
    identification_characteristics = EXCLUDED.identification_characteristics,
    identification_confidence = EXCLUDED.identification_confidence,
    native_origin = EXCLUDED.native_origin,
    distribution = EXCLUDED.distribution,
    campus_location = EXCLUDED.campus_location,
    flowers = EXCLUDED.flowers,
    flowering_season = EXCLUDED.flowering_season,
    fruits = EXCLUDED.fruits,
    fruiting_season = EXCLUDED.fruiting_season,
    uses = EXCLUDED.uses,
    traditional_medicinal_uses = EXCLUDED.traditional_medicinal_uses,
    safety_warnings = EXCLUDED.safety_warnings,
    interesting_facts = EXCLUDED.interesting_facts,
    status = EXCLUDED.status,
    updated_at = NOW();


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/japanese-pittosporum-pittosporum/plant_36_1.png', '/images/plants/plant_36_1.png', 'Japanese Pittosporum (Pittosporum tobira) photographed on campus', 'Campus specimen #36 observation', true, 1, NOW()
FROM public.plants WHERE slug = 'japanese-pittosporum-pittosporum'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plants (
    slug, common_name, other_common_names, scientific_name, family,
    category, identification_characteristics, identification_confidence,
    native_origin, distribution, campus_location,
    flowers, flowering_season, fruits, fruiting_season,
    uses, traditional_medicinal_uses, safety_warnings, interesting_facts,
    status, created_at, updated_at
) VALUES (
    'areca-palm-chrysalidocarpus', 'Areca Palm', ARRAY['Golden Cane Palm', 'Butterfly Palm']::text[], 'Chrysalidocarpus lutescens H.Wendl.', 'Arecaceae',
    'palm', 'Characteristics Several slender stems grow together from the base. Long, feather-like leaves. Many narrow leaflets along each leaf stalk. Dense, clumping appearance. Stems can have a yellowish or golden colour.', 'confirmed',
    'Indian Subcontinent and tropical regions.', 'Cultivated and naturalized across tropical India and campus grounds.', 'School Campus Gardens and Perimeter Grounds',
    'Seasonal inflorescences.', 'Seasonal flowering depending on climate.', 'Small seeds or berries.', 'Follows flowering season.',
    'Campus shade, landscape beautification, and student field study.', 'Documented in traditional Indian ethnobotany.', 'Observe without plucking leaves or ingesting plant parts. Wash hands after plant contact.', 'Documented by Azim Premji School students as part of the campus living biodiversity catalogue.',
    'published', NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
    common_name = EXCLUDED.common_name,
    other_common_names = EXCLUDED.other_common_names,
    scientific_name = EXCLUDED.scientific_name,
    family = EXCLUDED.family,
    category = EXCLUDED.category,
    identification_characteristics = EXCLUDED.identification_characteristics,
    identification_confidence = EXCLUDED.identification_confidence,
    native_origin = EXCLUDED.native_origin,
    distribution = EXCLUDED.distribution,
    campus_location = EXCLUDED.campus_location,
    flowers = EXCLUDED.flowers,
    flowering_season = EXCLUDED.flowering_season,
    fruits = EXCLUDED.fruits,
    fruiting_season = EXCLUDED.fruiting_season,
    uses = EXCLUDED.uses,
    traditional_medicinal_uses = EXCLUDED.traditional_medicinal_uses,
    safety_warnings = EXCLUDED.safety_warnings,
    interesting_facts = EXCLUDED.interesting_facts,
    status = EXCLUDED.status,
    updated_at = NOW();


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/areca-palm-chrysalidocarpus/plant_37_1.png', '/images/plants/plant_37_1.png', 'Areca Palm (Chrysalidocarpus lutescens H.Wendl.) photographed on campus', 'Campus specimen #37 observation', true, 1, NOW()
FROM public.plants WHERE slug = 'areca-palm-chrysalidocarpus'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plants (
    slug, common_name, other_common_names, scientific_name, family,
    category, identification_characteristics, identification_confidence,
    native_origin, distribution, campus_location,
    flowers, flowering_season, fruits, fruiting_season,
    uses, traditional_medicinal_uses, safety_warnings, interesting_facts,
    status, created_at, updated_at
) VALUES (
    'creeping-fig-ficus', 'Creeping Fig', ARRAY['Climbing Fig', 'Creeping Ficus']::text[], 'Ficus pumila L.', 'Moraceae',
    'climber', 'Characteristics Evergreen woody climber. Glossy green leaves. Leaves are simple and usually oval to somewhat heart-shaped. It produces aerial rootlets that attach to walls, trees and other surfaces. The really interesting feature Creeping Fig can have two very different kinds of leaves on the same plant. When it is young and climbing, the leaves are small. Later, mature fruiting branches can develop much larger and thicker leaves. This difference between leaf forms is called heterophylly.', 'confirmed',
    'Indian Subcontinent and tropical regions.', 'Cultivated and naturalized across tropical India and campus grounds.', 'School Campus Gardens and Perimeter Grounds',
    'Seasonal inflorescences.', 'Seasonal flowering depending on climate.', 'Small seeds or berries.', 'Follows flowering season.',
    'Campus shade, landscape beautification, and student field study.', 'Documented in traditional Indian ethnobotany.', 'Observe without plucking leaves or ingesting plant parts. Wash hands after plant contact.', 'Documented by Azim Premji School students as part of the campus living biodiversity catalogue.',
    'published', NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
    common_name = EXCLUDED.common_name,
    other_common_names = EXCLUDED.other_common_names,
    scientific_name = EXCLUDED.scientific_name,
    family = EXCLUDED.family,
    category = EXCLUDED.category,
    identification_characteristics = EXCLUDED.identification_characteristics,
    identification_confidence = EXCLUDED.identification_confidence,
    native_origin = EXCLUDED.native_origin,
    distribution = EXCLUDED.distribution,
    campus_location = EXCLUDED.campus_location,
    flowers = EXCLUDED.flowers,
    flowering_season = EXCLUDED.flowering_season,
    fruits = EXCLUDED.fruits,
    fruiting_season = EXCLUDED.fruiting_season,
    uses = EXCLUDED.uses,
    traditional_medicinal_uses = EXCLUDED.traditional_medicinal_uses,
    safety_warnings = EXCLUDED.safety_warnings,
    interesting_facts = EXCLUDED.interesting_facts,
    status = EXCLUDED.status,
    updated_at = NOW();


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/creeping-fig-ficus/plant_38_1.png', '/images/plants/plant_38_1.png', 'Creeping Fig (Ficus pumila L.) photographed on campus', 'Campus specimen #38 observation', true, 1, NOW()
FROM public.plants WHERE slug = 'creeping-fig-ficus'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plants (
    slug, common_name, other_common_names, scientific_name, family,
    category, identification_characteristics, identification_confidence,
    native_origin, distribution, campus_location,
    flowers, flowering_season, fruits, fruiting_season,
    uses, traditional_medicinal_uses, safety_warnings, interesting_facts,
    status, created_at, updated_at
) VALUES (
    'chinese-hibiscus-hibiscus', 'Chinese Hibiscus', ARRAY['Shoe Flower', 'Hibiscus']::text[], 'Hibiscus × rosa-sinensis', 'Malvaceae',
    'shrub', 'Characteristics Large yellow flower. Flower is double or semi-double. Glossy green leaves. Leaves have toothed edges. Woody branching shrub. The exact yellow cultivar cannot be identified from the photograph alone because there are many similar cultivated varieties.', 'confirmed',
    'Indian Subcontinent and tropical regions.', 'Cultivated and naturalized across tropical India and campus grounds.', 'School Campus Gardens and Perimeter Grounds',
    'Seasonal inflorescences.', 'Seasonal flowering depending on climate.', 'Small seeds or berries.', 'Follows flowering season.',
    'Campus shade, landscape beautification, and student field study.', 'Documented in traditional Indian ethnobotany.', 'Observe without plucking leaves or ingesting plant parts. Wash hands after plant contact.', 'Documented by Azim Premji School students as part of the campus living biodiversity catalogue.',
    'published', NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
    common_name = EXCLUDED.common_name,
    other_common_names = EXCLUDED.other_common_names,
    scientific_name = EXCLUDED.scientific_name,
    family = EXCLUDED.family,
    category = EXCLUDED.category,
    identification_characteristics = EXCLUDED.identification_characteristics,
    identification_confidence = EXCLUDED.identification_confidence,
    native_origin = EXCLUDED.native_origin,
    distribution = EXCLUDED.distribution,
    campus_location = EXCLUDED.campus_location,
    flowers = EXCLUDED.flowers,
    flowering_season = EXCLUDED.flowering_season,
    fruits = EXCLUDED.fruits,
    fruiting_season = EXCLUDED.fruiting_season,
    uses = EXCLUDED.uses,
    traditional_medicinal_uses = EXCLUDED.traditional_medicinal_uses,
    safety_warnings = EXCLUDED.safety_warnings,
    interesting_facts = EXCLUDED.interesting_facts,
    status = EXCLUDED.status,
    updated_at = NOW();


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/chinese-hibiscus-hibiscus/plant_39_1.png', '/images/plants/plant_39_1.png', 'Chinese Hibiscus (Hibiscus × rosa-sinensis) photographed on campus', 'Campus specimen #39 observation', true, 1, NOW()
FROM public.plants WHERE slug = 'chinese-hibiscus-hibiscus'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plants (
    slug, common_name, other_common_names, scientific_name, family,
    category, identification_characteristics, identification_confidence,
    native_origin, distribution, campus_location,
    flowers, flowering_season, fruits, fruiting_season,
    uses, traditional_medicinal_uses, safety_warnings, interesting_facts,
    status, created_at, updated_at
) VALUES (
    'jungle-flame-ixora', 'Jungle Flame', ARRAY['Jungle Geranium', 'Flame of the Woods', 'Red Ixora', 'Ixora']::text[], 'Ixora coccinea L.', 'Rubiaceae',
    'shrub', 'Characteristics Evergreen flowering shrub. Glossy, dark-green leaves. Leaves are opposite. Young stems can have a reddish colour. Dense clusters of bright tubular flowers.', 'confirmed',
    'Indian Subcontinent and tropical regions.', 'Cultivated and naturalized across tropical India and campus grounds.', 'School Campus Gardens and Perimeter Grounds',
    'Seasonal inflorescences.', 'Seasonal flowering depending on climate.', 'Small seeds or berries.', 'Follows flowering season.',
    'Campus shade, landscape beautification, and student field study.', 'Documented in traditional Indian ethnobotany.', 'Observe without plucking leaves or ingesting plant parts. Wash hands after plant contact.', 'Documented by Azim Premji School students as part of the campus living biodiversity catalogue.',
    'published', NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
    common_name = EXCLUDED.common_name,
    other_common_names = EXCLUDED.other_common_names,
    scientific_name = EXCLUDED.scientific_name,
    family = EXCLUDED.family,
    category = EXCLUDED.category,
    identification_characteristics = EXCLUDED.identification_characteristics,
    identification_confidence = EXCLUDED.identification_confidence,
    native_origin = EXCLUDED.native_origin,
    distribution = EXCLUDED.distribution,
    campus_location = EXCLUDED.campus_location,
    flowers = EXCLUDED.flowers,
    flowering_season = EXCLUDED.flowering_season,
    fruits = EXCLUDED.fruits,
    fruiting_season = EXCLUDED.fruiting_season,
    uses = EXCLUDED.uses,
    traditional_medicinal_uses = EXCLUDED.traditional_medicinal_uses,
    safety_warnings = EXCLUDED.safety_warnings,
    interesting_facts = EXCLUDED.interesting_facts,
    status = EXCLUDED.status,
    updated_at = NOW();


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/jungle-flame-ixora/plant_40_1.png', '/images/plants/plant_40_1.png', 'Jungle Flame (Ixora coccinea L.) photographed on campus', 'Campus specimen #40 observation', true, 1, NOW()
FROM public.plants WHERE slug = 'jungle-flame-ixora'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plants (
    slug, common_name, other_common_names, scientific_name, family,
    category, identification_characteristics, identification_confidence,
    native_origin, distribution, campus_location,
    flowers, flowering_season, fruits, fruiting_season,
    uses, traditional_medicinal_uses, safety_warnings, interesting_facts,
    status, created_at, updated_at
) VALUES (
    'gardenia-gardenia', 'Gardenia', ARRAY['Cape Jasmine', 'Cape Jessamine']::text[], 'Gardenia jasminoides J.Ellis', 'Rubiaceae',
    'shrub', 'Characteristics Evergreen shrub. Very glossy, dark-green leaves. Leaves are thick and leathery. Prominent veins. White, waxy-looking flowers. Strong, sweet fragrance. Long flower buds can have a twisted or spiral appearance.', 'confirmed',
    'Indian Subcontinent and tropical regions.', 'Cultivated and naturalized across tropical India and campus grounds.', 'School Campus Gardens and Perimeter Grounds',
    'Seasonal inflorescences.', 'Seasonal flowering depending on climate.', 'Small seeds or berries.', 'Follows flowering season.',
    'Campus shade, landscape beautification, and student field study.', 'Documented in traditional Indian ethnobotany.', 'Observe without plucking leaves or ingesting plant parts. Wash hands after plant contact.', 'Documented by Azim Premji School students as part of the campus living biodiversity catalogue.',
    'published', NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
    common_name = EXCLUDED.common_name,
    other_common_names = EXCLUDED.other_common_names,
    scientific_name = EXCLUDED.scientific_name,
    family = EXCLUDED.family,
    category = EXCLUDED.category,
    identification_characteristics = EXCLUDED.identification_characteristics,
    identification_confidence = EXCLUDED.identification_confidence,
    native_origin = EXCLUDED.native_origin,
    distribution = EXCLUDED.distribution,
    campus_location = EXCLUDED.campus_location,
    flowers = EXCLUDED.flowers,
    flowering_season = EXCLUDED.flowering_season,
    fruits = EXCLUDED.fruits,
    fruiting_season = EXCLUDED.fruiting_season,
    uses = EXCLUDED.uses,
    traditional_medicinal_uses = EXCLUDED.traditional_medicinal_uses,
    safety_warnings = EXCLUDED.safety_warnings,
    interesting_facts = EXCLUDED.interesting_facts,
    status = EXCLUDED.status,
    updated_at = NOW();


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/gardenia-gardenia/plant_41_1.png', '/images/plants/plant_41_1.png', 'Gardenia (Gardenia jasminoides J.Ellis) photographed on campus', 'Campus specimen #41 observation', true, 1, NOW()
FROM public.plants WHERE slug = 'gardenia-gardenia'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plants (
    slug, common_name, other_common_names, scientific_name, family,
    category, identification_characteristics, identification_confidence,
    native_origin, distribution, campus_location,
    flowers, flowering_season, fruits, fruiting_season,
    uses, traditional_medicinal_uses, safety_warnings, interesting_facts,
    status, created_at, updated_at
) VALUES (
    'jackfruit-artocarpus', 'Jackfruit', ARRAY['Kathal']::text[], 'Artocarpus heterophyllus', 'Moraceae',
    'tree', 'A large evergreen tree with a thick trunk and broad, dense foliage. Leaves are thick, glossy and dark green. Young leaves can sometimes have a slightly lobed shape, while mature leaves are usually oval and smooth. The tree produces very large fruits directly from the trunk and large branches, which is one of its easiest features to notice. The fruit has a rough green or yellowish-green skin covered with small, hard, pointed bumps. The tree contains a sticky white latex, especially when a fruit or branch is cut.', 'confirmed',
    'Jackfruit is believed to have originated in the rainforests of the Western Ghats of India. It is now grown in many tropical parts of the world.', 'Cultivated and naturalized across tropical India and campus grounds.', 'School Campus Gardens and Perimeter Grounds',
    'Seasonal inflorescences.', 'Seasonal flowering depending on climate.', 'Small seeds or berries.', 'Follows flowering season.',
    'The ripe fruit is eaten fresh because the yellow flesh is sweet and fragrant. Unripe jackfruit is commonly cooked as a vegetable, especially in Indian cooking. The seeds can also be boiled, roasted or cooked.', 'Documented in traditional Indian ethnobotany.', 'Observe without plucking leaves or ingesting plant parts. Wash hands after plant contact.', 'Unlike most fruits that hang from small branches, jackfruit can grow straight out of the trunk. This type of fruiting is called cauliflory.',
    'published', NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
    common_name = EXCLUDED.common_name,
    other_common_names = EXCLUDED.other_common_names,
    scientific_name = EXCLUDED.scientific_name,
    family = EXCLUDED.family,
    category = EXCLUDED.category,
    identification_characteristics = EXCLUDED.identification_characteristics,
    identification_confidence = EXCLUDED.identification_confidence,
    native_origin = EXCLUDED.native_origin,
    distribution = EXCLUDED.distribution,
    campus_location = EXCLUDED.campus_location,
    flowers = EXCLUDED.flowers,
    flowering_season = EXCLUDED.flowering_season,
    fruits = EXCLUDED.fruits,
    fruiting_season = EXCLUDED.fruiting_season,
    uses = EXCLUDED.uses,
    traditional_medicinal_uses = EXCLUDED.traditional_medicinal_uses,
    safety_warnings = EXCLUDED.safety_warnings,
    interesting_facts = EXCLUDED.interesting_facts,
    status = EXCLUDED.status,
    updated_at = NOW();


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/jackfruit-artocarpus/plant_42_1.png', '/images/plants/plant_42_1.png', 'Jackfruit (Artocarpus heterophyllus) photographed on campus', 'Campus specimen #42 observation', true, 1, NOW()
FROM public.plants WHERE slug = 'jackfruit-artocarpus'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plants (
    slug, common_name, other_common_names, scientific_name, family,
    category, identification_characteristics, identification_confidence,
    native_origin, distribution, campus_location,
    flowers, flowering_season, fruits, fruiting_season,
    uses, traditional_medicinal_uses, safety_warnings, interesting_facts,
    status, created_at, updated_at
) VALUES (
    'mango-mangifera', 'Mango', ARRAY['Aam']::text[], 'Mangifera indica', 'Anacardiaceae',
    'tree', 'A large evergreen tree with a thick trunk and a broad, rounded crown. Leaves are long, narrow, leathery and glossy. New leaves are often copper, reddish or light green before becoming dark green. Leaves usually grow in clusters near the ends of branches. The tree has rough, greyish-brown bark as it becomes older. Mango fruits are usually oval or slightly kidney-shaped, although their shape and colour can vary a lot between varieties.', 'confirmed',
    'Mango is native to South Asia, particularly the Indian subcontinent and nearby regions. India has a very long history of growing and cultivating mangoes.', 'Cultivated and naturalized across tropical India and campus grounds.', 'School Campus Gardens and Perimeter Grounds',
    'Seasonal inflorescences.', 'Seasonal flowering depending on climate.', 'Small seeds or berries.', 'Follows flowering season.',
    'Mango is mainly grown for its fruit. Raw mangoes are used for pickles, chutneys and other foods, while ripe mangoes are eaten fresh or used to make juice, shakes and desserts. Mango leaves are also used for decoration during some Indian festivals and ceremonies.', 'Documented in traditional Indian ethnobotany.', 'Observe without plucking leaves or ingesting plant parts. Wash hands after plant contact.', 'Mango is the national fruit of India. Also, the new leaves of a mango tree can look completely different from the older dark-green leaves because they often start out copper-coloured.',
    'published', NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
    common_name = EXCLUDED.common_name,
    other_common_names = EXCLUDED.other_common_names,
    scientific_name = EXCLUDED.scientific_name,
    family = EXCLUDED.family,
    category = EXCLUDED.category,
    identification_characteristics = EXCLUDED.identification_characteristics,
    identification_confidence = EXCLUDED.identification_confidence,
    native_origin = EXCLUDED.native_origin,
    distribution = EXCLUDED.distribution,
    campus_location = EXCLUDED.campus_location,
    flowers = EXCLUDED.flowers,
    flowering_season = EXCLUDED.flowering_season,
    fruits = EXCLUDED.fruits,
    fruiting_season = EXCLUDED.fruiting_season,
    uses = EXCLUDED.uses,
    traditional_medicinal_uses = EXCLUDED.traditional_medicinal_uses,
    safety_warnings = EXCLUDED.safety_warnings,
    interesting_facts = EXCLUDED.interesting_facts,
    status = EXCLUDED.status,
    updated_at = NOW();


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/mango-mangifera/plant_43_1.png', '/images/plants/plant_43_1.png', 'Mango (Mangifera indica) photographed on campus', 'Campus specimen #43 observation', true, 1, NOW()
FROM public.plants WHERE slug = 'mango-mangifera'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plants (
    slug, common_name, other_common_names, scientific_name, family,
    category, identification_characteristics, identification_confidence,
    native_origin, distribution, campus_location,
    flowers, flowering_season, fruits, fruiting_season,
    uses, traditional_medicinal_uses, safety_warnings, interesting_facts,
    status, created_at, updated_at
) VALUES (
    'jamun-syzygium', 'Jamun', ARRAY['Indian blackberry', 'Java plum', 'Black plum']::text[], 'Syzygium cumini', 'Myrtaceae',
    'tree', 'A medium to large evergreen tree with a dense crown. Leaves are thick, smooth and glossy. The leaves are usually oval to slightly elongated and have a noticeable smell when crushed. The bark is greyish-brown and becomes rougher as the tree gets older. The fruits are small and oval or elongated. They start green and become deep purple to almost black when ripe.', 'confirmed',
    'Jamun is native to the Indian subcontinent and surrounding parts of South Asia. It is now widely grown in different parts of India.', 'Cultivated and naturalized across tropical India and campus grounds.', 'School Campus Gardens and Perimeter Grounds',
    'Seasonal inflorescences.', 'Seasonal flowering depending on climate.', 'Small seeds or berries.', 'Follows flowering season.',
    'The ripe fruit is eaten fresh and has a sweet but slightly astringent taste. It can also be used to make juice, jam, jelly, squash and other products.', 'Documented in traditional Indian ethnobotany.', 'Observe without plucking leaves or ingesting plant parts. Wash hands after plant contact.', 'The ripe fruit can stain your tongue and lips purple. The deep colour comes from natural pigments called anthocyanins.',
    'published', NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
    common_name = EXCLUDED.common_name,
    other_common_names = EXCLUDED.other_common_names,
    scientific_name = EXCLUDED.scientific_name,
    family = EXCLUDED.family,
    category = EXCLUDED.category,
    identification_characteristics = EXCLUDED.identification_characteristics,
    identification_confidence = EXCLUDED.identification_confidence,
    native_origin = EXCLUDED.native_origin,
    distribution = EXCLUDED.distribution,
    campus_location = EXCLUDED.campus_location,
    flowers = EXCLUDED.flowers,
    flowering_season = EXCLUDED.flowering_season,
    fruits = EXCLUDED.fruits,
    fruiting_season = EXCLUDED.fruiting_season,
    uses = EXCLUDED.uses,
    traditional_medicinal_uses = EXCLUDED.traditional_medicinal_uses,
    safety_warnings = EXCLUDED.safety_warnings,
    interesting_facts = EXCLUDED.interesting_facts,
    status = EXCLUDED.status,
    updated_at = NOW();


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/jamun-syzygium/plant_44_1.png', '/images/plants/plant_44_1.png', 'Jamun (Syzygium cumini) photographed on campus', 'Campus specimen #44 observation', true, 1, NOW()
FROM public.plants WHERE slug = 'jamun-syzygium'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plants (
    slug, common_name, other_common_names, scientific_name, family,
    category, identification_characteristics, identification_confidence,
    native_origin, distribution, campus_location,
    flowers, flowering_season, fruits, fruiting_season,
    uses, traditional_medicinal_uses, safety_warnings, interesting_facts,
    status, created_at, updated_at
) VALUES (
    'papaya-carica', 'Papaya', ARRAY['Papita']::text[], 'Carica papaya', 'Caricaceae',
    'herb', 'Papaya is a small, fast-growing plant with a soft, usually unbranched trunk. The trunk is hollow and has marks left behind by old leaves. Large leaves grow mainly near the top of the plant. The leaves are deeply divided and look somewhat like the fingers of a hand. Papaya fruits are large, smooth and usually green when unripe. As they ripen, they usually turn yellow or orange. The inside contains orange or yellow flesh and many small black seeds.', 'confirmed',
    'Papaya originally came from tropical America but is now grown widely in tropical and subtropical countries, including India.', 'Cultivated and naturalized across tropical India and campus grounds.', 'School Campus Gardens and Perimeter Grounds',
    'Seasonal inflorescences.', 'Seasonal flowering depending on climate.', 'Small seeds or berries.', 'Follows flowering season.',
    'Ripe papaya is eaten fresh and is also used in juices, salads and desserts. Green papaya can be cooked as a vegetable.', 'Documented in traditional Indian ethnobotany.', 'Observe without plucking leaves or ingesting plant parts. Wash hands after plant contact.', 'Papaya is sometimes called a tree, but botanically it is more like a giant herb because its stem is soft and does not form normal woody branches like a typical tree.',
    'published', NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
    common_name = EXCLUDED.common_name,
    other_common_names = EXCLUDED.other_common_names,
    scientific_name = EXCLUDED.scientific_name,
    family = EXCLUDED.family,
    category = EXCLUDED.category,
    identification_characteristics = EXCLUDED.identification_characteristics,
    identification_confidence = EXCLUDED.identification_confidence,
    native_origin = EXCLUDED.native_origin,
    distribution = EXCLUDED.distribution,
    campus_location = EXCLUDED.campus_location,
    flowers = EXCLUDED.flowers,
    flowering_season = EXCLUDED.flowering_season,
    fruits = EXCLUDED.fruits,
    fruiting_season = EXCLUDED.fruiting_season,
    uses = EXCLUDED.uses,
    traditional_medicinal_uses = EXCLUDED.traditional_medicinal_uses,
    safety_warnings = EXCLUDED.safety_warnings,
    interesting_facts = EXCLUDED.interesting_facts,
    status = EXCLUDED.status,
    updated_at = NOW();


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/papaya-carica/plant_45_1.jpg', '/images/plants/plant_45_1.jpg', 'Papaya (Carica papaya) photographed on campus', 'Campus specimen #45 observation', true, 1, NOW()
FROM public.plants WHERE slug = 'papaya-carica'
ON CONFLICT (storage_path) DO NOTHING;


INSERT INTO public.plants (
    slug, common_name, other_common_names, scientific_name, family,
    category, identification_characteristics, identification_confidence,
    native_origin, distribution, campus_location,
    flowers, flowering_season, fruits, fruiting_season,
    uses, traditional_medicinal_uses, safety_warnings, interesting_facts,
    status, created_at, updated_at
) VALUES (
    'banana-musa', 'Banana', ARRAY['Kela']::text[], 'Musa spp.', 'Musaceae',
    'herb', 'Banana has very large, long leaves that grow from the centre of the plant. The leaves are broad and soft and can easily tear in strong wind. What looks like a trunk is actually a pseudostem, made from tightly packed leaf bases. Banana plants grow quickly and can form a large group of plants around the original plant. The flower develops from the centre and eventually hangs downward. Banana fruits grow together in bunches, sometimes with many individual bananas.', 'confirmed',
    'Bananas have a long history of cultivation in South and Southeast Asia. Today they are grown throughout tropical and subtropical regions.', 'Cultivated and naturalized across tropical India and campus grounds.', 'School Campus Gardens and Perimeter Grounds',
    'Seasonal inflorescences.', 'Seasonal flowering depending on climate.', 'Small seeds or berries.', 'Follows flowering season.',
    'Ripe bananas are eaten fresh and are also used in shakes, desserts and many cooked foods. Green bananas can be cooked as a vegetable. Banana flowers are also eaten in some parts of India. The leaves are traditionally used as plates or for serving food in several regions.', 'Documented in traditional Indian ethnobotany.', 'Observe without plucking leaves or ingesting plant parts. Wash hands after plant contact.', 'A banana plant is not technically a tree. It is one of the world''s largest flowering herbaceous plants. Also, what we commonly call the banana "trunk" is actually made from tightly wrapped leaf sheaths. After one banana plant produces its bunch, that particular pseudostem does not keep producing forever. New shoots, called suckers, grow from the base and can produce the next crop.',
    'published', NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
    common_name = EXCLUDED.common_name,
    other_common_names = EXCLUDED.other_common_names,
    scientific_name = EXCLUDED.scientific_name,
    family = EXCLUDED.family,
    category = EXCLUDED.category,
    identification_characteristics = EXCLUDED.identification_characteristics,
    identification_confidence = EXCLUDED.identification_confidence,
    native_origin = EXCLUDED.native_origin,
    distribution = EXCLUDED.distribution,
    campus_location = EXCLUDED.campus_location,
    flowers = EXCLUDED.flowers,
    flowering_season = EXCLUDED.flowering_season,
    fruits = EXCLUDED.fruits,
    fruiting_season = EXCLUDED.fruiting_season,
    uses = EXCLUDED.uses,
    traditional_medicinal_uses = EXCLUDED.traditional_medicinal_uses,
    safety_warnings = EXCLUDED.safety_warnings,
    interesting_facts = EXCLUDED.interesting_facts,
    status = EXCLUDED.status,
    updated_at = NOW();


INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, 'plants/banana-musa/plant_46_1.jpg', '/images/plants/plant_46_1.jpg', 'Banana (Musa spp.) photographed on campus', 'Campus specimen #46 observation', true, 1, NOW()
FROM public.plants WHERE slug = 'banana-musa'
ON CONFLICT (storage_path) DO NOTHING;

COMMIT;
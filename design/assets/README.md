# Oficina criativa

`creative-workshop.png`: imagem gerada pelo tool nativo image_gen, sem texto, logos ou dados de aprendizagem. Uso recomendado: jornada/introdução, 320–440px de largura no desktop. Não repetir em cada etapa. O diagrama didático deve ser HTML/SVG com rótulos traduzíveis.

Prompt final usado:

> Use case: stylized-concept. Asset type: Ganesha learning dashboard illustration. Primary request: a premium miniature isometric 3D creative workshop island where a beginner builds their first website. Clear 45 degree top-down isometric view. One cream rectangular floating plinth with rounded corners, three broad shallow steps leading to a simple open rounded arch in purple, a small lavender desk holding a blank upright website canvas with a few rounded geometric panels (no text), two minimal small trees or sculptural plants, one tiny golden sphere tucked beside a step. Spacious restrained composition, architectural and inviting, no characters. Soft refined ceramic and matte PBR materials, gentle lifelike studio light, soft natural shadows, crisp edges, polished stylized realism. Palette: off-white #FDFDFC, cream #FBFAF8, very pale lavender #F5F3FB, vivid purple #6C3BEE, very small gold accent. Background solid very pale lavender #F5F3FB. Square image, entire miniature visible with generous empty margins, objects centered, harmonious detail. No letters, numbers, symbols, logos, watermarks, graphs or pseudo-text. Illustration conveys a calm starting point and building something tangible.

Alt descritivo disponível nos 11 idiomas em `../locales.js`, chave `alt`. Se a imagem for puramente decorativa e a mesma ideia já estiver no texto, usar `alt=""`. Não traduzir o bitmap e não espelhá-lo no árabe.

## Variante para o novo layout nativo

`creative-workshop-transparent.png`: derivada com o tool nativo image_gen; remove o fundo opaco para a ilustração se integrar ao painel lavanda, como a referência desktop. Prompt final de edição:

> Use case: background-extraction. Edit target: the supplied Ganesha miniature creative workshop. Remove only the pale lavender background, producing a genuinely transparent alpha background. Preserve the complete workshop plinth, purple arch, desk and page mockup, plants, gold sphere, camera view, colors, dimensions, object positions, polished isometric 3D materials and natural soft contact shadow. No text, no logos, no added objects. Keep ample transparent margin and the whole island visible. This is for placement directly on a soft lavender course panel; no opaque rectangular backdrop.

A referência usada foi `creative-workshop.png`. A variante final está salva no projeto. Usar `object-fit:contain`, sem recortar e sem espelhar em RTL.

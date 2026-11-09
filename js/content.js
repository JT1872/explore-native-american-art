/**
 * Explore Native Art — museum exhibit content
 * Content date: 2026-11-09 (America/Denver)
 * STATUS: DRAFT — requires cultural content review before store rollout.
 * Original paraphrase from cited public educational sources + curriculum outline.
 * No invented artists, provenance, or tribal attributions.
 * Diverse Native nations are NOT treated as one culture.
 * Hero photos: openly licensed museum photos under assets/heroes/ (see CREDITS.md).
 * Jewelry, Rug, Sandpainting heroes: Joe / Tanner Trading floor photography.
 * Intro videos: local assets/videos/<id>.mp4 when supplied by Joe.
 */
window.ENA_CONTENT = {
  meta: {
    title: "Explore Native American Art",
    subtitle: "An in-store learning gallery",
    brand: "Tanner Trading / Fifth Generation Trading Co.",
    location: "Farmington, NM / Park City, UT",
    contentDate: "2026-11-09",
    reviewStatus: "Exhibit in development — under cultural review",
    exhibitLabel: "Exhibit in development — under cultural review",
    epigraph: "Every piece has a maker. Every technique has a history. Every tradition continues through the people who practice it.",
    disclaimer:
      "Headquartered in the heart of the Southwest.",
    visitorMode: "discovery_video",
    deeperEnabled: false,
    quizEnabled: false
  },

  sources: [
    { id: "hero-pottery", label: "Wikimedia Commons — Acoma storage jar (Daderot / de Young, CC0)", url: "https://commons.wikimedia.org/wiki/File:Storage_jar_(olla),_New_Mexico,_Acoma_Pueblo,_c._1890-1910,_earthenware_and_pigment_-_De_Young_Museum_-_DSC00300.JPG" },
    { id: "hero-basket", label: "Wikimedia Commons — Apache basket (Daderot / Chazen, CC0)", url: "https://commons.wikimedia.org/wiki/File:Basket,_Apache_people,_Arizona,_c._1900,_coiled_willow_and_devil%27s_claw_-_Chazen_Museum_of_Art_-_DSC01849.JPG" },
    { id: "hero-sculpture", label: "Wikimedia Commons / Met Open Access — Haida Totem Pole Model (CC0)", url: "https://commons.wikimedia.org/wiki/File:Totem_Pole_Model_MET_TR.165.15.2011.jpeg" },
    { id: "hero-painting", label: "Wikimedia Commons — Howling Wolf, A Procession of Southern Cheyenne Warriors (public domain)", url: "https://commons.wikimedia.org/wiki/File:%27A_Procession_of_Southern_Cheyenne_Warriors%27_by_Howling_Wolf,_Honolulu_Museum_of_Art.jpg" },
    { id: "nmai-glittering", label: "NMAI — Glittering World: Navajo Jewelry of the Yazzie Family", url: "https://americanindian.si.edu/explore/exhibitions/item?id=890" },
    { id: "nmai-look", label: "NMAI Native Knowledge 360° — Learning to Look", url: "https://americanindian.si.edu/nk360/informational/learning-to-look-and-object-investigation" },
    { id: "heard-textiles", label: "Heard Museum — Textiles collection overview", url: "https://heard.org/collection/textiles/" },
    { id: "heard-home", label: "Heard Museum — teacher / education resources", url: "https://heard.org/teacher-resources/" },
    { id: "maxwell-tgh", label: "Maxwell Museum — Object Monday: Two Grey Hills", url: "https://maxwellmuseum.unm.edu/news-events/news/object-monday-two-grey-hills-navajo-weaving" },
    { id: "nps-pottery", label: "U.S. National Park Service — Pottery of the Ancestral Pueblo (teachers)", url: "https://www.nps.gov/teachers/classrooms/pottery-of-the-ancestral-pueblo.htm" },
    { id: "nmai-clay", label: "NMAI — Born of Clay exhibition brochure", url: "https://americanindian.si.edu/sites/1/files/pdf/exhibitions/BornOfClay-brochure.pdf" },
    { id: "nmnh-basket", label: "Smithsonian NMNH — Akimel O’odham basket trays (materials)", url: "https://naturalhistory.si.edu/research/botany/research/edward-palmer-father-ethnobotany/akimel-oodham-basket-trays" },
    { id: "gallup-sacred", label: "Gallup New Deal Art — Sacred and Secular (sandpainting)", url: "https://www.gallupnewdealart.org/special-exhibits/the-art-and-artists-of-the-indian-new-deal/sacred-and-secular/" },
    { id: "rosie-interview", label: "Sessions College — Rosie Yellowhair artist interview", url: "https://www.sessions.edu/notes-on-design/native-american-artist-interview-rosie-yellowhair/" },
    { id: "calacademy-jewelry", label: "California Academy — Southwest Jewelry overview", url: "https://www.calacademy.org/explore-science/southwest-jewelry" },
    { id: "nmai-canvas", label: "NMAI — Stretching the Canvas: Ten Decades of Native Painting", url: "https://americanindian.si.edu/explore/exhibitions/item?id=1017" },
    { id: "gallup-studio", label: "Gallup New Deal Art — The Studio Style", url: "https://www.gallupnewdealart.org/special-exhibits/the-art-and-artists-of-the-indian-new-deal/the-studio-style/" },
    { id: "houser-hof", label: "National Native American Hall of Fame — Allan Houser", url: "https://nativehalloffame.org/allan-houser-haozous/" },
    { id: "iaia-studio", label: "IAIA — Studio Arts program", url: "https://iaia.edu/explore-programs/studio-arts/" },
    { id: "apple-guided", label: "Apple Support — Use Guided Access on iPhone or iPad", url: "https://support.apple.com/en-us/111795" }
  ],

  artForms: [
    {
      id: "jewelry",
      visible: true,
      title: "Jewelry Making & Turquoise",
      short: "Silver, stone, and the artist’s hand",
      discovery: "Native American jewelry of the Southwest is the work of many nations\u2014including Navajo, Zuni, Hopi, and others\u2014each with a distinctive approach to silver and stone. Notice the silversmithing: stampwork, casting, inlay, overlay. Turquoise ranges from brilliant blues to deep greens, often with natural matrix. The stone is only part of the story. Look at the silverwork, the balance of the design, and the artist\u2019s individual hand.",
      icon: "jewelry",
      wallLabel: {
        title: "Jewelry, Silverwork & Turquoise",
        community: "Many Southwest Native nations — including Diné (Navajo), Zuni, Hopi, and others",
        materials: "Sterling silver, turquoise, and other stones",
        period: "Historic to contemporary",
        credit: "Educational paraphrase after NMAI Glittering World. Photographed piece details available from staff."
      },
      photoNeed: "Close-ups of tagged floor jewelry (bezel, inlay, stamped silver) with artist/community visible on labels — Joe’s own photos only.",
      introVideo: {
        status: "ready",
        title: "Tanner Trading Silversmith Demo Video",
        runtime: "2:49",
        src: "./assets/videos/jewelry.mp4",
        video: { provider: "vimeo", id: "1123330984", url: "https://vimeo.com/1123330984" }
      },
            hero: {
      kind: "photo",
      source: "joe",
      card: "./assets/heroes/jewelry-card.webp",
      src: "./assets/heroes/jewelry-hero.webp",
      fallback: "./assets/heroes/jewelry-hero.jpg",
      alt: "Hands holding turquoise and silver jewelry",
      objectPosition: "center 42%",
      creditLine: "Photograph: Tanner Trading",
      credit: {
        title: "Store floor jewelry",
        maker: "",
        nation: "",
        date: "",
        photographer: "Tanner Trading",
        sourceUrl: "",
        license: "Tanner Trading photograph",
        institution: "Tanner Trading / Fifth Generation",
        note: "Piece details available from staff."
      }
    },
      overview:
        "Jewelry making has long been important for many Southwest Native peoples. Contemporary Native jewelers—including many Diné (Navajo) artists—work in silver, gold, and stone, drawing on traditional materials while developing personal styles. Museum interpretations often discuss values such as beauty, centering, and balance.",
      attributionNote:
        "Pieces on our floor may be made by artists from many nations. Always check the label or ask staff for the artist and community—never assume one nation made all Southwest jewelry.",
      lookFor: [
        "How stones are set (bezel, inlay, nugget)",
        "Surface finish of the silver",
        "Construction quality of clasps, bezels, and joins",
        "Artist signature, hallmark, or tag when present"
      ],
      diagram: "jewelry",
      sourceIds: ["nmai-glittering", "nmai-look", "calacademy-jewelry"],
      deeper: [
        {
          id: "j-d1",
          title: "Materials & settings",
          minutes: "3–5 min",
          objective: "Distinguish bezel, inlay, and stamped surfaces—and why attribution still matters more than technique alone.",
          talkingPoints: [
            "Sterling silver may show stamping, soldering, casting, and finishing.",
            "Turquoise color and matrix vary by source; color is not a tribal barcode.",
            "Coral, lapis, jet, shell, and other materials appear across artists and nations."
          ],
          touch: "With staff permission, compare weight and bezel edge on two tagged pieces.",
          sourceIds: ["nmai-glittering", "calacademy-jewelry"]
        },
        {
          id: "j-d2",
          title: "Looking before attributing",
          minutes: "3–5 min",
          objective: "Practice museum-style looking: materials and construction first, then ask whose hands made the piece.",
          talkingPoints: [
            "NMAI education encourages learning to look at objects carefully before claiming meaning.",
            "Community approaches historically diverge (for example silver-forward vs stone-forward emphases)—still verify the living artist on the tag.",
            "Hallmarks and quality marks are clues for staff reference, not automatic proof of authorship."
          ],
          touch: "Read a floor tag aloud: artist name, then community—before guessing style.",
          sourceIds: ["nmai-look", "nmai-glittering"]
        }
      ]
    },
    {
      id: "rug",
      visible: true,
      title: "Rug Weaving",
      short: "Looms, wool, and living design",
      discovery: "Navajo weaving is shaped by generations of knowledge, creativity, and dedication. Many weavers learn through observation and practice\u2014often from mothers, grandmothers, and family. Wool may be cleaned, carded, spun, and dyed by hand. On an upright loom, the design builds one strand at a time. From Two Grey Hills to Ganado and beyond, each weaving reflects regional history and the weaver\u2019s own vision.",
      icon: "weaving",
      wallLabel: {
        title: "Weaving & Rugs",
        community: "Diné (Navajo) and Pueblo textile traditions (distinct)",
        materials: "Wool yarn, upright loom structures",
        period: "Historic blankets through contemporary tapestries",
        credit: "After Heard Museum textiles education. Photographed piece details available from staff."
      },
      photoNeed: "Detail photos of tagged weavings showing yarn, edges, and region/artist labels — Joe’s photography.",
      introVideo: { status: "awaiting_file", title: "Introductory film", runtime: "≈ 60 sec", src: "./assets/videos/rug.mp4" },
            hero: {
      kind: "photo",
      source: "joe",
      card: "./assets/heroes/rug-card.webp",
      src: "./assets/heroes/rug-hero.webp",
      fallback: "./assets/heroes/rug-hero.jpg",
      alt: "Close-up of a woven rug with a stepped diamond design",
      objectPosition: "50% 42%",
      creditLine: "Photograph: Tanner Trading",
      credit: {
        title: "Store floor weaving",
        maker: "",
        nation: "",
        date: "",
        photographer: "Tanner Trading",
        sourceUrl: "",
        license: "Tanner Trading photograph",
        institution: "Tanner Trading / Fifth Generation",
        note: "Piece details available from staff."
      }
    },
      overview:
        "In the Southwest, major textile traditions include Diné (Navajo) and Pueblo weaving. Diné weavers have long woven textiles for use, trade, and sale. Museum collections document historic wearing blankets, later regional rug styles, and contemporary individual designs.",
      attributionNote:
        "Diné weaving is often represented in trading-post rug collections. Pueblo textiles (including Hopi) include garments and other forms with their own histories. Do not assume every textile is Navajo—read the label.",
      lookFor: [
        "Evenness of edges and corners",
        "Yarn twist and color transitions",
        "Whether the piece is a rug, tapestry, or wearable textile",
        "Artist and weaving community when documented"
      ],
      diagram: "weaving",
      sourceIds: ["heard-textiles", "maxwell-tgh", "nmai-look"],
      deeper: [
        {
          id: "r-d1",
          title: "Regional names & close looking",
          minutes: "3–5 min",
          objective: "Recognize regional style names as trade/collection language—not the whole story of living weavers.",
          talkingPoints: [
            "Heard Museum notes regionally named Diné styles such as Two Grey Hills, Ganado, Crystal, Chinle, Teec Nos Pos, Wide Ruins, and Burntwater.",
            "Two Grey Hills weavings are often associated with finely spun natural wool tones and complex geometrics—still credit the weaver.",
            "Contemporary weavers continue to innovate beyond mid-century formulas."
          ],
          touch: "With permission, feel warp/weft density on two tagged weavings, then describe before guessing a region.",
          sourceIds: ["heard-textiles", "maxwell-tgh"]
        },
        {
          id: "r-d2",
          title: "Process: from fiber to cloth",
          minutes: "4–6 min",
          objective: "Sequence key process stages without inventing sacred teachings.",
          talkingPoints: [
            "Master weaver teaching contexts discuss spinning, dyeing, warping, and design transitions.",
            "Process language belongs to weaver educators—not store marketing slogans."
          ],
          touch: "View the neutral loom diagram; ask staff to point out warp vs weft on a floor piece.",
          sourceIds: ["heard-textiles", "heard-home"]
        }
      ]
    },
    {
      id: "sandpainting",
      visible: true,
      title: "Sandpainting",
      short: "Sacred ceremony and public art—kept distinct",
      discovery: "Navajo sandpainting has deep connections to Din\u00e9 cultural and ceremonial traditions. In healing ceremonies, practitioners create temporary images that serve sacred purposes. Navajo artists also make permanent sandpaintings for display\u2014patient work with colored materials on a fixed surface. Meanings of figures should come from reliable sources and the artist\u2019s own explanation. Ceremonial practice and display art are not the same.",
      icon: "sand",
      wallLabel: {
        title: "Sandpainting",
        community: "Diné (Navajo) ceremonial practice; commercial works by named artists",
        materials: "Ceremonial: temporary pigments on earth · Commercial: sand on permanent backing",
        period: "Living ceremonial practice; commercial art 20th century–present",
        credit: "Educational notes after Gallup New Deal Art Sacred and Secular. Photographed piece details available from staff."
      },
      photoNeed: "Only Joe-owned photos of clearly labeled commercial sandpaintings by named artists. Never photograph or recreate ceremonial sandpaintings.",
      introVideo: { status: "awaiting_file", title: "Introductory film", runtime: "≈ 60 sec", src: "./assets/videos/sandpainting.mp4" },
            hero: {
      kind: "photo",
      source: "joe",
      card: "./assets/heroes/sandpainting-card.webp",
      src: "./assets/heroes/sandpainting-hero.webp",
      fallback: "./assets/heroes/sandpainting-hero.jpg",
      alt: "Sandpainting on board — commercial artwork",
      objectPosition: "48% 40%",
      creditLine: "Sandpainting on board. Photograph: Tanner Trading",
      credit: {
        title: "Sandpainting on board",
        maker: "",
        nation: "",
        date: "",
        photographer: "Tanner Trading",
        sourceUrl: "",
        license: "Tanner Trading photograph",
        institution: "Tanner Trading / Fifth Generation",
        note: "Commercial floor piece. Cultural reviewer should confirm display appropriateness. Piece details available from staff."
      }
    },
      overview:
        "Ceremonial sandpainting is a Diné healing art made by singers for a temporary purpose and traditionally destroyed. Commercial sandpaintings sold in galleries are a different, secular form—often permanent works by named artists. This exhibit teaches respect and distinction. It does not recreate restricted ceremonial designs.",
      attributionNote:
        "Diné artist Rosie Yellowhair has publicly stated that ceremonial sandpainting is done by medicine people for healing, and that her own works are storytelling pieces for sale—not medicine practice. Always read the artist tag on commercial works.",
      sacredNote: "Ceremonial sandpainting and permanent display art are different. We do not show restricted ceremonial designs.",
      lookFor: [
        "Whether a piece is labeled as a commercial artwork by a named artist",
        "Permanent backing vs any claim of ceremonial use (store pieces are commercial)",
        "Respectful language on labels—flag overclaims of healing power",
        "Artist name and community on the tag"
      ],
      diagram: "sand",
      sourceIds: ["gallup-sacred", "rosie-interview", "nmai-look"],
      deeper: [
        {
          id: "s-d1",
          title: "Sacred vs commercial",
          minutes: "3–5 min",
          objective: "State the difference between temporary ceremonial sandpainting and permanent commercial art.",
          talkingPoints: [
            "Ceremonial paintings are made for a specific temporary purpose and traditionally not preserved as décor.",
            "Commercial works use permanent backings; artists may alter details for sale contexts.",
            "Never treat a commercial piece as a ceremony souvenir that ‘contains’ healing power."
          ],
          touch: "Look-only: find a labeled commercial sandpainting and read the artist name aloud. No sand practice.",
          sourceIds: ["gallup-sacred", "rosie-interview"]
        }
      ]
    },
    {
      id: "pottery",
      visible: false,
      title: "Pottery",
      short: "Clay, coil, polish, and fire",
      discovery: "Pueblo pottery is coil-built by hand, shaped, polished, and often painted before firing. Distinct communities\u2014including Acoma, San Ildefonso, Hopi, and others\u2014carry their own forms, clay bodies, and design languages. What you see on a finished pot is the result of many careful decisions: form, surface, and fire. Ask our staff about the artist and community on any piece on the floor.",
      icon: "pottery",
      wallLabel: {
        title: "Pottery",
        community: "Pueblo communities and other Southwest Native potters — each distinct",
        materials: "Local clays, slips, plant and mineral paints",
        period: "Ancestral traditions through living artists",
        credit: "After NPS Pottery of the Ancestral Pueblo and NMAI Born of Clay"
      },
      photoNeed: "Tagged Pueblo and other pottery forms showing polish, paint, and community/artist labels — Joe’s photos.",
      introVideo: { status: "awaiting_file", title: "Introductory film", runtime: "≈ 60 sec", src: "./assets/videos/pottery.mp4" },
      hero: {
      kind: "photo",
      card: "./assets/heroes/pottery-card.webp",
      src: "./assets/heroes/pottery-hero.webp",
      fallback: "./assets/heroes/pottery-hero.jpg",
      alt: "Acoma Pueblo polychrome storage jar (olla)",
      objectPosition: "center 35%",
      creditLine: "Storage jar (olla), Acoma Pueblo, c. 1890–1910, de Young Museum. Photo: Daderot. CC0.",
      credit: {
        title: "Storage jar (olla)",
        maker: "Artist once known",
        nation: "Acoma Pueblo",
        date: "c. 1890–1910",
        photographer: "Daderot",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Storage_jar_(olla),_New_Mexico,_Acoma_Pueblo,_c._1890-1910,_earthenware_and_pigment_-_De_Young_Museum_-_DSC00300.JPG",
        license: "CC0 1.0",
        institution: "de Young Museum"
      }
    },
      overview:
        "In the Southwest, Pueblo pottery traditions remain living arts. Many vessels are built by coiling and scraping rather than throwing on a wheel. Communities and individual artists develop distinctive clays, forms, slips, paints, and firing approaches.",
      attributionNote:
        "Pueblo pottery varies by community. Navajo pottery also exists as its own tradition. Never treat “Pueblo pottery” as one identical style—ask which community and artist made a piece.",
      lookFor: [
        "Wall thickness and balance of the form",
        "Surface polish and paint precision",
        "Base and rim finishing",
        "Artist signature and Pueblo/community attribution on the tag"
      ],
      diagram: "pottery",
      sourceIds: ["nps-pottery", "nmai-clay", "heard-home"],
      deeper: [
        {
          id: "p-d1",
          title: "Coil, scrape, polish",
          minutes: "3–5 min",
          objective: "Name coil-and-scrape construction and why community style still requires the tag.",
          talkingPoints: [
            "Clay coils are stacked and scraped so coil lines may disappear.",
            "Slips and paints may use plant or mineral sources; yucca-fiber brushes are documented in educational materials.",
            "Firing atmosphere affects color, including approaches associated with some Pueblo lineages."
          ],
          touch: "Trace the neutral coil diagram, then ask staff to show a tagged pot’s silhouette.",
          sourceIds: ["nps-pottery", "nmai-clay"]
        },
        {
          id: "p-d2",
          title: "Community styles",
          minutes: "4–6 min",
          objective: "Give one visual cue difference between at least two pueblo traditions using museum language, then verify the tag.",
          talkingPoints: [
            "NPS teaching materials aim to help learners distinguish communities such as Acoma, Jemez, San Ildefonso, and Santa Clara.",
            "Fire clouds, slip, polish, and carved vs painted decoration are observation tools—not authenticity certificates."
          ],
          touch: "Match a floor pot’s tag community to one observation you can see (form, polish, or paint).",
          sourceIds: ["nps-pottery"]
        }
      ]
    },
    {
      id: "sculpture",
      visible: false,
      title: "Sculpture",
      short: "Form, material, and living makers",
      discovery: "Native sculpture and carving take many forms\u2014stone, wood, bronze, and other materials\u2014shaped by artists from different nations and studio traditions. Look for the maker\u2019s name, the material, and how planes and surfaces were worked by hand. We don\u2019t invent symbolism for a piece; when meaning is documented, we\u2019ll share it. Ask staff about the artist behind any sculpture on our floor.",
      icon: "sculpture",
      wallLabel: {
        title: "Sculpture",
        community: "Native sculptors across many nations",
        materials: "Stone, bronze, wood, mixed media",
        period: "Modern and contemporary",
        credit: "After museum and Native arts education framing (e.g., Allan Houser legacy; IAIA studio arts)"
      },
      photoNeed: "Floor sculpture photos with artist names visible; multiple angles. No generic pan-Indian clip art.",
      introVideo: { status: "awaiting_file", title: "Introductory film", runtime: "≈ 60 sec", src: "./assets/videos/sculpture.mp4" },
      hero: {
      kind: "photo",
      card: "./assets/heroes/sculpture-card.webp",
      src: "./assets/heroes/sculpture-hero.webp",
      fallback: "./assets/heroes/sculpture-hero.jpg",
      alt: "Haida wood totem pole model sculpture",
      objectPosition: "center 15%",
      creditLine: "Totem Pole Model, Haida, Metropolitan Museum of Art. Open Access. CC0.",
      credit: {
        title: "Totem Pole Model",
        maker: "Artist once known",
        nation: "Haida",
        date: "Historic model (Met collection)",
        photographer: "Metropolitan Museum of Art",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Totem_Pole_Model_MET_TR.165.15.2011.jpeg",
        license: "CC0 1.0",
        institution: "The Metropolitan Museum of Art"
      }
    },
      overview:
        "Native sculptors work in monumental and small scales across many materials. This gallery approaches sculpture as individual artist practice—not anonymous ‘craft curios.’ Chiricahua Apache sculptor Allan Houser (Haozous) is one widely cited modern figure in museum education; he is a path in, not the only path.",
      attributionNote:
        "Always credit the living or historical artist named on the piece. Do not guess nation from subject matter alone. Carved figures with ceremonial associations (including some Hopi/Zuni contexts) need separate, careful treatment—not covered as craft how-to here.",
      lookFor: [
        "Silhouette from more than one angle",
        "Material and finish (cast seams, tool marks, polish)",
        "Artist name before any style guess",
        "Nation/community on the label when provided"
      ],
      diagram: "sculpture",
      sourceIds: ["houser-hof", "iaia-studio", "nmai-look"],
      deeper: [
        {
          id: "sc-d1",
          title: "Material & finish literacy",
          minutes: "3–5 min",
          objective: "Name the material of a floor sculpture and one finish clue without inventing tribal meaning.",
          talkingPoints: [
            "Bronze, stone, wood, and mixed media read differently under light.",
            "Artist biography and nation affiliation come from labels—not guessed from subject alone."
          ],
          touch: "With staff approval, use soft raking light to notice tool marks on a sturdy piece.",
          sourceIds: ["iaia-studio", "houser-hof"]
        }
      ]
    },
    {
      id: "painting",
      visible: false,
      title: "Painting",
      short: "Many Native painting histories",
      discovery: "Native easel painting and studio work connect living artists to histories of teaching, mentorship, and personal style. Look for the artist\u2019s name, the support and media, and the choices that make the work theirs. We keep nations and individuals distinct. If a piece is on our floor, staff can help you with the artist\u2019s story as it is documented\u2014not invented.",
      icon: "painting",
      wallLabel: {
        title: "Painting",
        community: "Native painters across nations — credit the individual",
        materials: "Paint on paper, board, canvas, and other supports",
        period: "Studio Style histories through contemporary practice",
        credit: "After Gallup New Deal Art Studio Style notes and NMAI Stretching the Canvas"
      },
      photoNeed: "Tagged paintings by Native artists on the floor (full work + signature detail). Avoid Western fine-art authentication imagery in this gallery.",
      introVideo: { status: "awaiting_file", title: "Introductory film", runtime: "≈ 60 sec", src: "./assets/videos/painting.mp4" },
      hero: {
      kind: "photo",
      card: "./assets/heroes/painting-card.webp",
      src: "./assets/heroes/painting-hero.webp",
      fallback: "./assets/heroes/painting-hero.jpg",
      alt: "Painting by Howling Wolf showing a procession of Southern Cheyenne warriors",
      objectPosition: "center center",
      creditLine: "A Procession of Southern Cheyenne Warriors, Howling Wolf (Cheyenne), mid–late 1870s, Honolulu Museum of Art. Public domain.",
      credit: {
        title: "A Procession of Southern Cheyenne Warriors",
        maker: "Howling Wolf (Ho-na-nist-to)",
        nation: "Cheyenne",
        date: "mid–late 1870s",
        photographer: "Hiart (faithful reproduction of PD artwork)",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:%27A_Procession_of_Southern_Cheyenne_Warriors%27_by_Howling_Wolf,_Honolulu_Museum_of_Art.jpg",
        license: "Public domain (PD-Art)",
        institution: "Honolulu Museum of Art"
      }
    },
      overview:
        "Native painting includes Studio Style histories and later modern and contemporary movements. Credit the painter. Avoid framing Native painting as timeless anonymous ‘Indian art.’ Western fine-art collecting tips belong on a different track.",
      attributionNote:
        "Studio Style (Santa Fe Indian School era) is one historical chapter—flat color, outlined forms—not all Native painting. Later painters expanded into abstraction and contemporary languages.",
      lookFor: [
        "Surface quality (flat graphic vs brushy)",
        "Artist name on label or signature",
        "Community affiliation when the label provides it",
        "Whether the work is historic Studio Style, mid-century, or contemporary"
      ],
      diagram: "painting",
      sourceIds: ["gallup-studio", "nmai-canvas", "nmai-look"],
      deeper: [
        {
          id: "pa-d1",
          title: "From Studio Style to now",
          minutes: "4–6 min",
          objective: "Name one Studio Style trait and one way later Native painters expanded the language.",
          talkingPoints: [
            "Studio Style often used flat, outlined color and scenes of Native life (museum education summaries).",
            "Post-Studio and institutional training contexts brought new materials, abstraction, and personal narrative.",
            "Place a floor painting on a timeline only when the label supports it."
          ],
          touch: "Compare two labeled paintings’ surfaces and read both artist names.",
          sourceIds: ["gallup-studio", "nmai-canvas"]
        }
      ]
    },
    {
      id: "basket",
      visible: false,
      title: "Basket Weaving",
      short: "Plant fibers, stitch by stitch",
      discovery: "Southwest basketry is built coil by coil or twined strand by strand from plant materials prepared by hand. Apache, Tohono O\u2019odham, Hopi, and other communities each have recognizable forms and techniques. A finished basket shows the maker\u2019s control of start, stitch, and rim. Ask staff for the artist and community on any basket we have on the floor.",
      icon: "basketry",
      wallLabel: {
        title: "Basketry",
        community: "Many Southwest nations — including O’odham, Apache, and others as tagged",
        materials: "Willow, yucca, devil’s claw, and other plant fibers",
        period: "Continuing community traditions",
        credit: "After Smithsonian NMNH ethnobotany education on Akimel O’odham basket trays"
      },
      photoNeed: "Tagged baskets showing start/rim construction and materials; optional comparison with clearly labeled imports if present.",
      introVideo: { status: "awaiting_file", title: "Introductory film", runtime: "≈ 60 sec", src: "./assets/videos/basket.mp4" },
      hero: {
      kind: "photo",
      card: "./assets/heroes/basket-card.webp",
      src: "./assets/heroes/basket-hero.webp",
      fallback: "./assets/heroes/basket-hero.jpg",
      alt: "Apache coiled basket of willow and devil’s claw",
      objectPosition: "center center",
      creditLine: "Basket, Apache people, Arizona, c. 1900, Chazen Museum of Art. Photo: Daderot. CC0.",
      credit: {
        title: "Basket",
        maker: "Artist once known",
        nation: "Apache people, Arizona",
        date: "c. 1900",
        photographer: "Daderot",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Basket,_Apache_people,_Arizona,_c._1900,_coiled_willow_and_devil%27s_claw_-_Chazen_Museum_of_Art_-_DSC01849.JPG",
        license: "CC0 1.0",
        institution: "Chazen Museum of Art"
      }
    },
      overview:
        "Basket making across the Southwest uses local plant materials and techniques such as coiling and plaiting. Different nations maintain distinct materials, forms, and design languages. Never assume every coiled tray is from the same people.",
      attributionNote:
        "Smithsonian ethnobotany education discusses Akimel O’odham tray materials. Apache and other traditions also appear in the trade. Identify the maker and nation on the label whenever possible.",
      lookFor: [
        "Even coil or weave spacing",
        "Rim finish and starting center",
        "Flexibility versus rigidity of the form",
        "Named artist and cultural attribution on the tag"
      ],
      diagram: "basketry",
      sourceIds: ["nmnh-basket", "nmai-look", "heard-home"],
      deeper: [
        {
          id: "b-d1",
          title: "Materials & construction tells",
          minutes: "3–5 min",
          objective: "List three observation checks—material, stitch density, start/rim—before accepting vague ‘Native-made’ claims.",
          talkingPoints: [
            "Plant materials such as willow and devil’s claw appear in documented Southwest basketry education.",
            "Construction clues (weight, stitch tightness, rim/start) help careful looking.",
            "Technique alone is not a certificate—verify attribution with reputable labels and staff."
          ],
          touch: "With staff permission, compare mass of two tagged baskets and note rim finish.",
          sourceIds: ["nmnh-basket"]
        }
      ]
    }
  ],

  quiz: [
    {
      id: "q1",
      prompt: "Many Southwest pottery vessels are shaped by which method (rather than a potter’s wheel)?",
      choices: [
        { id: "a", text: "Blow molding plastic", correct: false },
        { id: "b", text: "Coiling and scraping clay", correct: true },
        { id: "c", text: "Carving solid wood", correct: false }
      ],
      explain: "Parks and museum education describe coiling and scraping as a core way many Pueblo potters build vessels."
    },
    {
      id: "q2",
      prompt: "Two Grey Hills, Ganado, and Teec Nos Pos are names associated with what?",
      choices: [
        { id: "a", text: "Turquoise mine brands only", correct: false },
        { id: "b", text: "Recognized Diné (Navajo) weaving regional styles", correct: true },
        { id: "c", text: "Types of kiln firing", correct: false }
      ],
      explain: "Museum textiles education notes regionally based Diné weaving style names, while weavers also innovate individual designs."
    },
    {
      id: "q3",
      prompt: "When looking at jewelry in the store, what should you check first for accurate cultural credit?",
      choices: [
        { id: "a", text: "Assume every piece is from one nation", correct: false },
        { id: "b", text: "The artist name and community on the tag—or ask staff", correct: true },
        { id: "c", text: "Only the price tag", correct: false }
      ],
      explain: "Southwest jewelry is made by artists from many nations. Learn the specific maker’s story."
    },
    {
      id: "q4",
      prompt: "How should this gallery treat ceremonial Diné sandpainting?",
      choices: [
        { id: "a", text: "Teach visitors to recreate ceremonial designs with craft sand", correct: false },
        { id: "b", text: "Distinguish ceremony from commercial art; do not recreate restricted designs", correct: true },
        { id: "c", text: "Treat every sandpainting as identical tourist décor", correct: false }
      ],
      explain: "Ceremonial sandpainting is temporary healing practice. Commercial works are different. This exhibit does not recreate restricted designs."
    },
    {
      id: "q5",
      prompt: "Why does this gallery avoid showing “one Native style” for all art?",
      choices: [
        { id: "a", text: "Because many distinct Native nations create art with their own histories", correct: true },
        { id: "b", text: "Because museums forbid all education", correct: false },
        { id: "c", text: "Because only one material exists", correct: false }
      ],
      explain: "Good looking starts with materials and construction, then asks whose tradition and whose hands made the object."
    }
  ]
};

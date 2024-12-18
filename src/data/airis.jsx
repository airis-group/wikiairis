import { toast } from 'react-toastify'

export const toastSuccess = () => toast.success('Insert / Update Success!', {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    // transition: Bounce,
    });

export const entitasData = [
    {
        "id": 1,
        "nama_kategori": "Allah",
        "label": "Allah",
        "deskriosi": "Mengacu pada kata Allah dan semua\nnama-nama pada Asmaul Husna",
        "daftar_entitas": "1.  Allah\n2.  Tuhan Yang Maha Esa\n3.  Tuhan Yang Mahaperkasa lagi Maha Terpuji\n4.  Yang Maha Mengetahui dan Maha Bijaksana\n5.  Dan lain-lain"
    },
    {
        "id": 2,
        "nama_kategori": "ʻArasy Allah",
        "label": "Throne of Allah",
        "deskriosi": "Mengacu pada ‘Arasy Allah",
        "daftar_entitas": "ʻArasy"
    },
    {
        "id": 3,
        "nama_kategori": "Artefak",
        "label": "Artifact",
        "deskriosi": "Mengacu pada obyek yang dibuat oleh manusia",
        "daftar_entitas": "1.  Ka‘bah\n2.  Masjidilaqsa\n3.  Masjidilharam\n4.  Tabut"
    },
    {
        "id": 4,
        "nama_kategori": "Astronomi",
        "label": "Astronomi cal body",
        "deskriosi": "Mengacu pada obyek-obyek astronomi",
        "daftar_entitas": "1.   Bintang Syi‘ra\n2.   Bumi\n3.   Bulan\n4.   Matahari"
    },
    {
        "id": 5,
        "nama_kategori": "Kejadian",
        "label": "Event",
        "deskriosi": "Mengacu pada kejadian yang berlangsung pada waktu tertentu",
        "daftar_entitas": "1.   Hari kiamat\n2.   Hari akhir\n3.   Subuh\n4.   Lailatulqadar\n5.   Jum’at/hari Jum’at\nG.   Haji\n7.   Bulan Ramadan/Ramadan\n8.   Hari Sabat\n9.   Umrah\n10. Jahiliah"
    },
    {
        "id": 6,
        "nama_kategori": "Dewa palsu",
        "label": "False deity",
        "deskriosi": "Mengacu pada dewa-dewa palsu di masa sebelum datangnya Islam",
        "daftar_entitas": "1.   Al-‘Uzza 2.   Al-Lata\n3.   Wadd\n4.   Suwā‘\n5.   Ya‘ūq\nG.   Nasr\n7.   Manata\n8.   Ba‘l\n9.   Yagūṡ"
    },
    {
        "id": 7,
        "nama_kategori": "Kitab suci",
        "label": "Holy book",
        "deskriosi": "Mengacu pada kitab suci dalam agama Islam",
        "daftar_entitas": "1.   Al-Qur’an\n2.   Injil\n3.   Taurat\n4.   Zabur"
    },
    {
        "id": 8,
        "nama_kategori": "Bahasa",
        "label": "Language",
        "deskriosi": "Mengacu pada obyek bahasa manusia",
        "daftar_entitas": "Bahasa Arab"
    },
    {
        "id": 9,
        "nama_kategori": "Malaikat",
        "label": "Angel",
        "deskriosi": "Mengacu pada malaikat-malaikat ciptaan Allah",
        "daftar_entitas": "1.   Malaikat maut\n2.   Harut\n3.   Marut\n4.   Jibril\n5.   Malik\nG.   Mikail"
    },
    {
        "id": 10,
        "nama_kategori": "Manusia",
        "label": "Person",
        "deskriosi": "Mengacu pada obyek seseorang atau sekumpulan orang yang spesi1k",
        "daftar_entitas": "1.   Anak cucu Adam\n2.   Kaum ‘Ad/‘Ad\n3.   Orang-orang Ansar\n4.   Orang-orang Arab Badui\n5.   Bani Israil\nG.   Penghuni gua\n7.   Pasukan bergajah\n8.   Orang-orang yang membuat parit\n9.   Penduduk Rass\n10. Penduduk Aikah\n11. Ya’juj dan Ma’juj\n12. Penduduk Madyan\n13. Penduduk negeri Hijr\n14. Orang-orang Quraisy\n15. Bangsa Romawi\n16. Samud/(kaum) Samud\n17. Kaum Tubba‘\n18. Habil\n19. Azar\n20. Qabil\n21. ZulkiRi\n22. Zulqarnain\n23. Haman\n24. Imran\n25. Jalut\n2G. Luqman\n27. Maryam\n28. Fir‘aun\n29. Qarun\n30. Samiri\n31. Talut\n32. Uzair"
    },
    {
        "id": 11,
        "nama_kategori": "Rasul",
        "label": "Messenger",
        "deskriosi": "Mengacu pada obyek rasul spesi1k yang disebutkan di dalam Al-Qur’an",
        "daftar_entitas": "1.   Ilyas\n2.   Hud\n3.   Ibrahim\n4.   Ismail\n5.   Isa putra Maryam\nG.   Lut\n7.   Muhammad\n8.   Musa\n9.   Nuh\n10. Saleh\n11. Syuʻaib\n12. Yunus"
    },
    {
        "id": 12,
        "nama_kategori": "Nabi",
        "label": "Prophet",
        "deskriosi": "Mengacu pada obyek nabi spesi1k yang disebutkan di dalam Al-Qur’an",
        "daftar_entitas": "1.   Adam\n2.   Ahmad\n3.   Ayyub\n4.   Daud\n5.   Ilyasa’\nG.   Harun\n7.   Idris\n8.   Ishaq\n9.   Israil\n10. Isa Almasih putra Maryam\n11.  Sulaiman\n12. Yahya\n13. Ya‘qub\n14. Yusuf\n15. Zakaria"
    },
    {
        "id": 13,
        "nama_kategori": "Makhluk",
        "label": "Sentient",
        "deskriosi": "Mengacu pada obyek makhluk yang dijelaskan di Qur’an surat\nAn-Naml, ayat 82",
        "daftar_entitas": "Makhluk bergerak dari bumi"
    },
    {
        "id": 14,
        "nama_kategori": "Lokasi di akhirat",
        "label": "Afterlife Location",
        "deskriosi": "Mengacu pada obyek lokasi spesi1k di akhirat",
        "daftar_entitas": "1.   Surga Firdaus\n2.   Surga ‘Adn\n3.   Salsabil\n4.   Sidratulmuntaha\n5.   Saqar\nG.   Sijjīn\n7.   Pohon zaqum"
    },
    {
        "id": 15,
        "nama_kategori": "Lokasi di dunia",
        "label": "Geographic al location",
        "deskriosi": "Mengacu pada obyek lokasi spesi1k di dunia",
        "daftar_entitas": "1.   Negeri Babilonia\n2.   Badar\n3.   Bakkah\n4.   Makkah\n5.   Hunain\nG.   Iram\n7.   Madinah\n8.   Yasrib\n9.   Ahqaf\n10. Mesir\n11. Negeri Saba’\n12. Gunung Judiy\n13. Marwah\n14. Safa\n15. Arafah\n1G. Bukit Sinai"
    },
    {
        "id": 16,
        "nama_kategori": "Warna",
        "label": "Color",
        "deskriosi": "Mengacu pada obyek warna",
        "daftar_entitas": "Hijau"
    },
    {
        "id": 17,
        "nama_kategori": "Agama",
        "label": "Religion",
        "deskriosi": "Mengacu pada obyek agama spesi1k yang disebutkan di dalam Al-Qur’an",
        "daftar_entitas": "1.   Islam\n2.   Nasrani\n3.   Yahudi\n4.   Majusi\n5.   Sabiin"
    },
    {
        "id": 18,
        "nama_kategori": "Makanan",
        "label": "Food",
        "deskriosi": "Mengacu pada obyek makanan spesi1k yang disebutkan dalam Al-Qur’an",
        "daftar_entitas": "1.  Manna\n2.  Salwa"
    },
    {
        "id": 19,
        "nama_kategori": "Buah-buahan",
        "label": "Fruit",
        "deskriosi": "Mengacu pada obyek\nbuah-buahan spesi1k yang disebutkan dalam Al-Qur’an",
        "daftar_entitas": "1.  Delima\n2.  Anggur\n3.  Zaitun"
    },
    {
        "id": 20,
        "nama_kategori": "Lauf mahfuzh",
        "label": "The book of Allah",
        "deskriosi": "Mengacu pada obyek lauh mahfuzh  yang disebutkan dalam Al-Qur’an",
        "daftar_entitas": "1.  Lauf mahfuzh"
    },
    {
        "id": 21,
        "nama_kategori": "Pohon\nbuah-buahan",
        "label": "Fruit tree",
        "deskriosi": "Mengacu pada obyek pohon buah-buahan spesi1k yang disebutkan dalam Al-Qur’an",
        "daftar_entitas": "1.  Pohon kurma"
    }
]


export const entitas = [

    {
        label : "Allah",
        lang : {ind : 'Allah', en: "Allah"},
        isLabel : 1,
        sub : []
    },
    {
        label : "Throne",
        lang: {en: "Allah's Throne", ind: "'Arasy Allah"},
        isLabel : 1,
        sub : []
    },
    {
        label : "AstronomicalBody",
        lang: {en: "Astronomical body", ind: "Astronomi"},
        isLabel : 1,
        sub : []
    },
    {
        label : "HolyBook",
        lang: {en: "Holy book", ind: "Kitab suci"},
        isLabel : 1,
        sub : []
    },
    {
        label : "Language",
        lang: {en: "Language", ind: "Bahasa"},
        isLabel : 1,
        sub : []
    },
    {
        label : "Religion",
        lang: {en: "Religion", ind: "Agama"},
        isLabel : 1,
        sub : []
    },
    {
        label : "Food",
        lang: {en: "Food", ind: "Makanan"},
        isLabel : 1,
        sub : []
    },
    {
        label : "Fruit",
        lang: {en: "Fruit", ind: "Buah-buahan"},
        isLabel : 1,
        sub : []
    },
    {
        label : "TheBookOfAllah",
        lang: {en: "The book Of Allah", ind: "Lauf mahfuzh"},
        isLabel : 1,
        sub : []
    },
    {
        label : "Artefak",
        lang: {en: "Artifact", ind: "Artefak"},
        isLabel : 0,
        sub : [
            {
                label : "Tempat Ibadah",
                lang: {en: "Worship place", ind: "Tempat Ibadah"},
                isLabel : 0,
                sub2 : [
                    {
                        label : "Mosque",
                        lang: {en: "Mosque", ind: "Mesjid"},
                        isLabel : 1
                    }
                ]
            },
            {
                label : "Weaponary",
                lang: {en: "Weaponary", ind: "Persenjataan"},
                isLabel : 1,
                sub2 : []
    
            },
        ]
    },
    {
        label : "Lokasi",
        lang: {en: "Location", ind: "Lokasi"},
        isLabel : 0,
        sub : [
            {
                label : "AfterlifeLocation",
                lang: {en: "Afterlife location", ind: "Lokasi di akhirat"},
                isLabel : 1,
                sub2 : []
    
            },
            {
                label : "GeographicalLocation",
                lang: {en: "Geographical location", ind: "Lokasi di dunia"},
                isLabel : 1,
                sub2 : []
    
            },
        ]
    },
    {
        label : "Physical Attributes",
        lang: {en: "Physical Attributes", ind: "Atribut Fisik"},
        isLabel : 0,
        sub : [
            {
                label : "Color",
                lang: {en: "Color", ind: "Warna"},
                isLabel : 1,
                sub2 : []
            },
        ]
    },
    {
        label : "Dewa",
        lang: {en: "God", ind: "Dewa"},
        isLabel : 0,
        sub : [
            {
                label : "Idol",
                lang: {en: "Idol", ind: "Sesembahan"},
                isLabel : 1,
                sub2 : []
            },
            {
                label : "FalseDeity",
                lang: {en: "False deity", ind: "Dewa palsu"},
                isLabel : 1,
                sub2 : []
            }
        ]
    },
    {
        label : "Peristiwa",
        lang: {en: "Incident", ind: "Peristiwa"},
        isLabel : 0,
        sub : [
            {
                label : "AfterLifeEvent",
                lang: {en: "Afterlife event", ind: "Peristiwa setelah kiamat"},
                isLabel : 1,
                sub2 : []
            },
            {
                label : "CalendarEvent",
                lang: {en: "Calendar event", ind: "Peristiwa rutin"},
                isLabel : 1,
                sub2 : []
            },
            {
                label : "HistoricEvent",
                lang: {en: "Historic event", ind: "Peristiwa bersejarah"},
                isLabel : 1,
                sub2 : []
            },
            {
                label : "PhysicalEvent",
                lang: {en: "Physical event", ind: "Peristiwa konkrit"},
                isLabel : 1,
                sub2 : []
            },
            {
                label : "RoutineEvents",
                lang: {en: "Routine Events", ind: "Peristiwa Rutin"},
                isLabel : 1,
                sub2 : []
            },
        ]
    },
    {
        label : "LivingThings",
        lang: {en: "Living Things", ind: "Makhluk Hidup"},
        isLabel : 0,
        sub : [
            {
                label : "OrganicObjects",
                lang: {en: "Organic Objects", ind: "Obyek Organik"},
                isLabel : 0,
                sub2 : [
                    {
                        label : "BiologicalOrganisms",
                        lang: {en: "Biological organisms", ind: "Organisme biologis"},
                        isLabel : 0,
                        sub3 : [
                            {
                                label : "Plant",
                                lang: {en: "Plant", ind: "Tanaman"},
                                isLabel : 1,
                            },
                            {
                                label : "Bird",
                                lang: {en: "Bird", ind: "Burung"},
                                isLabel : 1,
                            },
                        ]
                    },
                    {
                        label : "Disease",
                        lang: {en: "Disease", ind: "Penyakit"},
                        isLabel : 1,
                        sub3 : []
                    }
                ]
            },
            {
                label : "Ciptaan Sentient",
                lang: {en: "Sentient Creations", ind: "Ciptaan Sentient"},
                isLabel : 0,
                sub2 : [
                    {
                        label : "Angel",
                        lang: {en: "Angel", ind: "Malaikat"},
                        isLabel : 1,
                        sub3 : []
                    },
                    {
                        label : "ChildrenOfAdam",
                        lang: {en: "Children of Adam", ind: "Anak cucu Adam"},
                        isLabel : 1,
                        sub3 : []
                    },
                    {
                    label : "Manusia",
                    lang: {en: "Human", ind: "Manusia"},

                    isLabel : 0,
                        sub3 : [
                            {
                                label : "HistoricPeople",
                                lang: {en: "Historic people", ind: "Kaum bersejarah"},
                                isLabel : 1
                            },
                            {
                                label : "HistoricPerson",
                                lang: {en: "Historic person", ind: "Manusia bersejarah"},
                                isLabel : 1
                            },
                            {
                                label : "King",
                                lang: {en: "King", ind: "Raja"},
                                isLabel : 1
                            },
                            {
                                label : "Queen",
                                lang: {en: "Queen", ind: "Ratu"},
                                isLabel : 1
                            },
                            {
                                label : "Messenger",
                                lang: {en: "Messenger", ind: "Rasul"},
                                isLabel : 1
                            },
                            {
                                label : "Prophet",
                                lang: {en: "Prophet", ind: "Nabi"},
                                isLabel : 1
                            },
                        ]
                    },
                ]
            },
        ]
    },
]


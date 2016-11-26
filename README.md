# Alkalmazások Fejlesztése Beadandó

#####0. A program rövid leírása
Tennivalók, feladatok, határidők számontartása és kezelése személyes használatra. Lényegében egy határidőnapló.


#####1. Követelményanalízis
######Funkcionális elvárások:
A program lehetővé teszi a vendégfelhasználónak:
- A főoldal megtekintését
- A leírás megtekintését
- A regisztrációt
- A bejelentkezést

Ezenfelül a regisztrált felhasználók számára még:
- Az új feladatok létrehozását
- Létező feladatok módosítását
- Létező feladatok törlését
- A feladatok listájának megtekintését
- Aktuális dátum, és megadott dátum alapján történő lekérdezés
- Bejelentkezéskor automatikus ellenőrzés, hogy vannak-e olyan nem teljesített feladatok, amiknek már lejárt a határidejük.
  - Ebben az esetben azok legfelülre kerülnek felhasználói felülvizsgálatra
- Egy felhasználónként beállítható X időtartam, hogy az előző ellenőrzés a következő X időben lejáró feladatokra is lefusson
- Feladatonként beállítható emlékeztetési idő, hogy ha a felhasználó bejelentkezésekor már ennél kevesebb van hátra, felülre kerül

Egy feladathoz tartozik:
- Név
- Leírás (esetleg rövidebb és hosszabb is)
- Határidő
- Típus? (beadandó, ZH, Vizsga, bevásárlólista, meeting)
- Megjegyzés rovat?(hogy áll jelenleg a feladat?)
- Teljesítve van-e?(igen, nem, folyamatban)


######Nem funkcionális elvárások:
- Ergonomikus felület
  - Lehetőleg mobilon is nézzen ki szépen, és legyen használható
- Biztonsági funkciók (jelszavak, hozzáférés)

######Használatieset-modell
Szerepkörök:
- Vendég: láthatja a kezdőoldalt, a leírást és regisztrálhat
- Felhasználó: Új feladatokat tud hozzáadni, törölni és módosítani a létezőket.

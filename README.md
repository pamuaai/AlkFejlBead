# Alkalmazások Fejlesztése Beadandó

####0. A program rövid leírása
Tennivalók, feladatok, határidők számontartása és kezelése személyes használatra. Lényegében egy határidőnapló.


####1. Követelményanalízis
#####Funkcionális elvárások:
A program lehetővé teszi a vendégfelhasználónak:
- A főoldal megtekintését (bejelentkezés)
- A regisztrációt
- A bejelentkezést

Ezenfelül a regisztrált felhasználók számára még:
- Az új feladatok létrehozását
- Létező feladatok módosítását
- Létező feladatok törlését
- A felhasználó feladat-listájának megtekintését
- Az új kategóriák létrehozását
- Létező kategóriák módosítását
- Létező kategóriák törlését
- A kategóriák listájának megtekintését

Egy feladathoz tartozik:
- Név
- Leírás (esetleg rövidebb és hosszabb is)
- Kategória (beadandó, ZH, Vizsga, bevásárlólista, meeting)
- Teljesítve van-e?(igen, nem)


#####Nem funkcionális elvárások:
- Ergonomikus felület
- Biztonsági funkciók (jelszavak, hozzáférés)

#####Használati eset diagramok 
![alt text](/readmePics/UseCase.png "Use Case")

#####Szerepkörök
- Vendég: láthatja a kezdőoldalt(bejelentkezés) és regisztrálhat
- Felhasználó: Új feladatokat és kategóriákat tud hozzáadni, törölni és módosítani a létezőket.

#####Szakterületi fogalomjegyzék	
- Task: egy feladat
- Category: egy kategória
- User: egy felhasználó

#####Folyamatok pontos menete	

![alt text](/readmePics/flowchart.png "Flowchart")
#####Oldaltérkép	Végpontok	
- /               
- /register               
- /register               
- /login               
- /login               
- /logout               
- /user/:id               
- /category/create               
- /category/create               
- /category/list               
- /category/:id               
- /category/:id               
- /category/:id/delete               
- /task/create               
- /task/create               
- /task/:id               
- /task/:id/edit               
- /task/:id/delete               

#####Oldalvázlatok	
###### Login:
![alt text](/readmePics/screens/loginPage.png "Login")
###### Regisztráció
![alt text](/readmePics/screens/registerPage.png "Register")
###### Egy user profilja
![alt text](/readmePics/screens/profile.png "User profile")
###### Task létrehozása
![alt text](/readmePics/screens/taskCreate.png "Create task")
###### Task módosítása
![alt text](/readmePics/screens/taskEdit.png "Edit task")
###### Kategóriák listája
![alt text](/readmePics/screens/categoryList.png "List of all categories")
###### Kategória létrehozása vagy módosítása
![alt text](/readmePics/screens/createOrEditCategory.png "Create or edit category")

#####Adatmodell	
![alt text](/readmePics/DataModel.png "Create or edit category")


#####Mappák funkiójának bemutatása
- Az App/Http mappa tartalmazza a Controller-eket, és a routes.js-tu
- Az App/Model az adatbázismodellek leírását tartalmazza, a táblák kapcsolatai itt vannak megadva
- A database/migrations a migrációkat tartalmazza
- A node_modules a node modulokhoz tartozó file-okat
- A public mappában vannak a weboldalon megjelenített képek, és a hozzá használt css-ek
- A resources/views tartalmazza a nézeteket

#####Fejlesztőkörnyezet bemutatása
- NodeJs környezetben, AdonisJs MVC keretrendszerben készült.

#####Telepítés lépései
- Git repo klónozása
- "npm install" parancs kiadása
- "npm run dev" parancs kiadása

#####Program használati útmutató
- Ha még nem használta a programot, az első lépés a futtatás után a regisztráció:
- Amennyiben már korábban regisztrált, jelentkezzen be:
- Értelemszerűen adja meg a megfelelő adatokat, majd kattintson a "Mehet" gombra
- Ezután a saját profiljára lesz átirányítva (amit bármikor elérhet a bal felső sarokban lévő logóra, vagy jobb felül a felhasználónevére kattintva)
- Itt láthatja az ön feladatainak listáját, bármelyikre rákattintva módosíthatja azt.
- A jobb felső sarokban találhatja a kategóriák módosítására, új Task felvételére és kijelentkezésre használatos gombokat is

######Új Task felvétele:
- Értelemszerűen adja meg a megfelelő adatokat, majd kattintson a "Mehet" gombra

######Létező Task módosítása:
- Értelemszerűen módosítsa a megfelelő adatokat, majd kattintson a "Mehet" gombra

######Új kategória felvétele:
- Adja meg a kategória nevét, majd kattintson a "Mehet" gombra

######Létező kategória módosítása:
- Módosítsa a kategória nevét, majd kattintson a "Mehet" gombra


placeholder="Title goes here"


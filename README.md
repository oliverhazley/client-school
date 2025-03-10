# Health Diary - CheckYoSelf

Tämä on Health Diary -sovelluksen README-tiedosto.

## 1. Kuvakaappaukset käyttöliitymästä



> **Esimerkki**  
> ![Dashboard-näkymä](images/dashboard.png)


---

## 2. Linkki sovellukseen (Front-end)

- **Frontend - (Netlify)**  
  [https://healthdiary.netlify.app](https://healthdiary.netlify.app)

---

## 3. Linkki käytössä olevaan Back-end-sovellukseen/API

- **Backend (Azure web service)** 
  [https://hdserver.azurewebsites.net/api](https://healthserver-fucqceehg7e2e4ef.swedencentral-01.azurewebsites.net/api)

- **DB hosted at Azure (Azure Database for MySQL server)**
  [https://healthdiary.mysql.database.azure.com](https://healthdiary.mysql.database.azure.com)

---

## 4. Linkki API-dokumentaatioon (apidoc)


---

## 5. Tietokannan kuvaus

- Sovelluksessa käytetään MySQL/MariaDB-tietokantaa (tai vastaavaa). Alla taulut:

  ![image](https://github.com/user-attachments/assets/8d70a38b-5bab-4c43-bcf2-e3e68d1b62a9)

---

## 6. Toiminnallisuudet

**(Landing page / login / signup)**

- Rekisteröityminen (Sign up)
- Kirjautuminen (Login) + JWT/istunnonhallinta

**(User dashboard)**

- Daily summary
- Päiväkirjamerkintöjen luonti + seuranta
- Vedenkulutuksen syöttö ja seuranta
- Lääkitysten syöttö ja seuranta + poistaminen
- Liikuntasuoritusten kirjaaminen + seuranta
- Unen syöttö ja seuranta
- Mood syöttö ja seuranta
  - Trendi data - Päivittäin, viikotain, kuukausittain
  - Sovellus on täysin responsiivinen

**(Admin dashboard)**

- Näkee kaikki käyttäjät
- Poista käyttäjiä

**(Ei lisätty mutta valmiina)**

- Käyttäjät voisivat poistaa omaa dataa (esim liikuntasuoritukset, päiväkirjamerkinnät yms, Ei lisätty kun aika loppu kesken)
- Enemmän toiminnallisuuksia admin dashboardiin, hän pystyisi muokata / poista mitä vaan dataa)
- Profilli jossa käyttäjä voi vaihtaa salasanaa tai sähköposti osoitetta (ei lisätty kun vaatis sähköpostin verifikointia yms)

---

## 7. Mahdolliset tunnetut bugit/ongelmat

- En ole ehtinyt hirveesti testaila sen jälkeen kun olen hostannut front + back + db, joten varmasti ilmestyy haasteita
- Tällä hetkellä admin ei pysty käyttää äppiä, vaan kirjautuu suoraan admin paneliin
- Jos lisää vahingossa ylimääräisen tai liikaa vettä, ei pysty painaa mitään "-" nappia että voisi korjata syötteen
- Jos käyttäjä unohtaa salasanan, ei ole mitään mitä voidaan tehdä asialle paitsi deletoida käyttäjä

---

## 8. Referenssit, käytetyt tutoriaalit, kirjastot


- React (frontend)
- Shadcn/ui inspired components (taken from my other projects i have worked on)
    - tabs.jsx complied of component pieces from other projects
- Express (backend)
- MySQL / MariaDB (tietokanta)
- Axios (API-kutsut)
- Node.js (palvelinympäristö)
- React Router (reititys)
- Netlify (Front-end-hosting)
- Azure (Back-end-hosting)
- Azure (DB-hosting)

**Ongelmanratkaisut**

- Opettajien materiaalit (github)
- Stackoverfull (bugfixing help, React Router, CORS)
- ChatGPT (bugfixing help - React Router issues, CORS issues, Axios help, Hosting help)
- Reddit (Hosting issues help)


---

##Kiitos! 
  




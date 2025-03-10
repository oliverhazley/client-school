# Health Diary - CheckYoSelf

Tämä on Health Diary -sovelluksen README-tiedosto.

## 1. Kuvakaappaukset käyttöliitymästä

**Landing page**
![image](https://github.com/user-attachments/assets/fb632779-8ee7-4507-aac5-4fbe7abd7386)

**Login**
![image](https://github.com/user-attachments/assets/e241423e-e1ca-4ebd-8fca-99337c2c864b)

**Sign up**
![image](https://github.com/user-attachments/assets/7c167305-d360-4c70-8106-553c46a43717)

**User dashboard daily summary**
![image](https://github.com/user-attachments/assets/9a1c8ca0-29d5-428e-a705-22b2ad91d02e)

**User dashboard medications**
![image](https://github.com/user-attachments/assets/3074e319-8780-4764-b613-860118d60ae6)

**User dashboard daily water**
![image](https://github.com/user-attachments/assets/91934cc4-05c4-4c55-9d25-ae9c84d1ab1c)

**User dashboard exercises**
![image](https://github.com/user-attachments/assets/0e6abf2d-628c-406c-b5fa-08e2959ca4f7)

**User dashboard new journal entry**
![image](https://github.com/user-attachments/assets/4a5b25cd-8e9a-431f-b405-5cb8231b024f)

**User dashboard past journal entries**
![image](https://github.com/user-attachments/assets/201c310b-9803-464e-a5d6-23fac4fefb0b)

**User dashboard data trends**
![image](https://github.com/user-attachments/assets/c3b5262b-bdde-4aec-a67e-c1b5aa40e465)

![image](https://github.com/user-attachments/assets/b53f7351-608a-42f3-b5a2-61324db090b2)

![image](https://github.com/user-attachments/assets/47bdc72c-0718-477c-8aaa-fcea49a321a1)

**Admin dashboard**
![image](https://github.com/user-attachments/assets/3f196e20-163f-4b83-822b-8081cb5e2545)


---

## 2. Linkki sovellukseen (Front-end)

- **Frontend - (Netlify)**  
  [https://healthdiary.netlify.app](https://healthdiary.netlify.app)

  ![image](https://github.com/user-attachments/assets/99fd7464-2f17-4dd6-bf10-3063d8ee3314)


---

## 3. Linkki käytössä olevaan Back-end-sovellukseen/API

- **Backend (Azure web service)** 
  [https://hdserver.azurewebsites.net/api](https://healthserver-fucqceehg7e2e4ef.swedencentral-01.azurewebsites.net/api)

- **DB hosted at Azure (Azure Database for MySQL server)**
  [https://healthdiary.mysql.database.azure.com](https://healthdiary.mysql.database.azure.com)


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

- Sovellus on täysin responsiivinen
- Daily summary
- Päiväkirjamerkintöjen luonti + seuranta
- Vedenkulutuksen syöttö ja seuranta
- Lääkitysten syöttö ja seuranta + poistaminen
- Liikuntasuoritusten kirjaaminen + seuranta (+ trendi data)
- Unen syöttö ja seuranta (+ trendi data)
- Mood syöttö ja seuranta (+ trendi data)

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
- Recharts
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

## Kiitos! 
  




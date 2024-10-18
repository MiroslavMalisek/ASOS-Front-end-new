# ASOS E-shop projekt - Frontend
Tento repozitár obsahuje kód pre Frontendovú časť projektu na predmet ASOS v 2. ročníku API na FEI STU.  
Frontend je naprogramovaný v knižnici React použitím nástroja Vite. Celý projekt je dockerizovaný.

## Návod na lokálne spustenie
1. Stihnite si a nainštalujte Node.js https://nodejs.org/en/download/prebuilt-installer. 
2. Prejdite do domovského adresára projetku:
 ```bash
   cd cesta_k_priečinku/Frontend
```
3. Nainštalujte dependencie projektu:
```bash
   npm install
```
4. Spustite aplikáciu pomocou príkazu
```bash
   npm run dev
```
5. V prehliadači otvorte aplikáciu na adrese http://localhost:3000/


## Návod na sputenie v Dockeri
1. Otvorte si aplikáciu Docker v počítači
2. Prejdite do domovského adresára projetku:
 ```bash
   cd cesta_k_priečinku/Frontend
```
3. Vytvorte Docker kontajner aplikácie pomocou príkazu
```bash
   docker-compose up --build
```
5. V prehliadači otvorte aplikáciu na adrese http://localhost:3000/
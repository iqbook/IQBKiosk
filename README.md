# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


select Barber

GetAvailableBarbersForQKiosk salonId right now hardcode value (Arghya said)
GetServicesByBarberKiosk 

select Services

GetBarberByServicesKiosk
JoinQueueKiosk

seacrh = GetAllBarbersKiosk
BarberLoginKiosk 


mainpage -> kiyosk button -> click -> open admin loggin -> after loggin redirect to kiyosk page with join queue and queuelist -> joinqueue -> joinqueue complete. 

setting -> two button logout and barberlogin -> logout -> success -> admin logged out.
barberlogin -> clicked -> barberlogin page -> success -> will get barberdata and a token -> take the data -> redirect to kiyosk dashboard -> just a rough design of dashboard. There two button salon (Online/Offline) and barber(Online/Offline) . take that barberloggin token and make the request to salon or barber. After success redirect him to kiyosk make joinqueue and queulist page. Also if the page get refresh redirect him to that page. Also show the barber details

Proper input validation in the join queue on each input not show please fill all the fields



//jwt token jodi kaj korte korte remove hoejai ba expire hoe jai tokhn

// if jwt token is expired tokhon ami kikorbo notun akta token ami create kore pathia debo


    <div class="skeleton"></div>

    
    @keyframes skeleton-animation {
        0% {
          background-position: -500px 0;
        }
        100% {
          background-position: 500px 0;
        }
      }
      
      .skeleton {
        width: 500px;
        height: 200px;
        background: linear-gradient(90deg, #d0d0d0 25%, #b0b0b0 50%, #d0d0d0 75%);
        background-size: 200% 100%;
        animation: skeleton-animation 1.5s infinite linear;
        border-radius: 8px; /* optional: adds rounded corners */
      }




vulkore rectangle 30 bg color white theke transparent hoegeche dashboard
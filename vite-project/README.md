# FlyHorizons - Frontend

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Run locally

To run the Frontend application locally, a change needs to be made, the **API.jsx** file needs to be modified to point to the IPv4 address of the server hosting the Kubernetes Cluster (AKS):

```javascript
import axios from 'axios';

const api = axios.create({
    baseURL: "http://9.235.9.33:8000/",
    withCredentials: true
});

export default api;
```

## Run as Deployment - *Netlify*

To run the Frontend application as a deployment, the **_redirects** file needs to be added as a reverse proxy in the **public folder**:
```
/apiredirect/* http://flyhorizons.italynorth.cloudapp.azure.com:8000/:splat 200
/* /index.html 200
```

Then, **API.jsx** needs to be modify to reflect this change:

```javascript
const api = axios.create({
    baseURL: "/apiredirect",
    withCredentials: true
});

export default api;
```

## Run end-to-end tests - *Cypress*
> npx cypress open

## Continuous Deployment - *Netlify*

Deployed with CI/CD on Netlify via GitHub – private repo for backend safety.
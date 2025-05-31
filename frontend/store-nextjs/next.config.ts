import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "http2.mlstatic.com",
      },
      {
        protocol: "https",
        hostname: "ardiaprod.vteximg.com.br"
      },
      {
        protocol: "https",
        hostname: "d3ugyf2ht6aenh.cloudfront.net"
      },
      {
        protocol: "https",
        hostname: "t2.rg.ltmcdn.com"
      },
      {
        protocol: "https",
        hostname: "calisa.com.ar"
      },
      {
        protocol: "https",
        hostname: "walmartar.vteximg.com.br"
      },
      {
        protocol: "https",
        hostname: "congeladosartico.com.ar"
      },
      {
        protocol: "https",
        hostname: "alohamaxikiosco.com.ar"
      },
      {
        protocol: "https",
        hostname: "arikiosco.tiendalite.com"
      },
      {
        protocol: "https",
        hostname: "tunovo.com.ar"
      },
      {
        protocol: "https",
        hostname: "www.terravilena.es"
      },
      {
        protocol: "https",
        hostname: "jumboargentina.vtexassets.com"
      },
      {
        protocol: "https",
        hostname: "carrefourar.vtexassets.com"
      },
      {
        protocol: "https",
        hostname: "elegifruta.com.ar"
      },
      {
        protocol: "https",
        hostname: "d1on8qs0xdu5jz.cloudfront.net"
      },
      {
        protocol: "https",
        hostname: "statics.dinoonline.com.ar"
      },
      {
        protocol: "https",
        hostname: "www.sancoryoguresypostres.com.ar"
      },
      {
        protocol: "https",
        hostname: "serviciosapp.casaley.com.mx"
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com"
      },
      {
        protocol: "https",
        hostname: "arcorencasa.com"
      }
    ]
  }
};

export default nextConfig;

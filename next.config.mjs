

/** @var {import("next").NextConfig} */
const nextConfig = {
async redirects(){
    return [{
        source: "/",
        destination: "/suspense",
        permanent: false
    },{
        source: "/1",
        destination: "/suspense",
        permanent: false
    },{
        source: "/2",
        destination: "/transitions",
        permanent: false
    },{
        source: "/3",
        destination: "/transition-suspense",
        permanent: false
    },]
}
  /* config options here */
};

export default nextConfig;

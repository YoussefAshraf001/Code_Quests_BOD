import { useEffect, useState, useRef } from "react";
import Globe from "react-globe.gl";

export default function GlobeMap({ users, darkMode }) {
  const [markers, setMarkers] = useState([]);
  const globeEl = useRef();

  useEffect(() => {
    setMarkers(
      users.map((user) => ({
        lat: parseFloat(user.address_geo_lat),
        lng: parseFloat(user.address_geo_lng),
        city: user.address_city,
      }))
    );
  }, [users]);

  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.3;
    }
  }, []);

  return (
    <div
      className="w-full h-full flex items-center justify-center rounded-xl shadow-lg
                    bg-white dark:bg-black transition-colors"
    >
      <Globe
        ref={globeEl}
        width={1800}
        height={920}
        globeImageUrl={
          darkMode
            ? "//unpkg.com/three-globe/example/img/earth-night.jpg"
            : "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        }
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        pointsData={markers}
        pointLat="lat"
        pointLng="lng"
        pointColor={() => (darkMode ? "white" : "blue")}
        pointAltitude={0.02}
        pointRadius={0.4}
        pointLabel={(d) => `<b>${d.city}</b>`}
        pointTransitionDuration={500}
        backgroundColor={darkMode ? "rgba(0,0,0,1)" : "rgba(255,255,255,1)"}
      />
    </div>
    // <div className="flex flex-col md:flex-row w-full h-full gap-6 p-4">
    //   <div className="flex-1 flex flex-col justify-center text-gray-800 dark:text-gray-100">
    //     <h2 className="text-2xl font-bold mb-4">Users Around the World</h2>
    //     <p className="mb-2">
    //       Here you can see where your users are located. Each point represents a
    //       city where a user resides.
    //     </p>
    //     <p>
    //       This layout allows you to provide context, stats, or additional
    //       controls while keeping the globe visible.
    //     </p>
    //   </div>
    //   <div className="flex items-center">
    //     <Globe
    //       ref={globeEl}
    //       width={800}
    //       height={800}
    //       globeImageUrl={
    //         darkMode
    //           ? "//unpkg.com/three-globe/example/img/earth-night.jpg"
    //           : "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
    //       }
    //       bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
    //       pointsData={markers}
    //       pointLat="lat"
    //       pointLng="lng"
    //       pointColor={() => (darkMode ? "white" : "blue")}
    //       pointAltitude={0.02}
    //       pointRadius={0.4}
    //       pointLabel={(d) => `<b>${d.city}</b>`}
    //       pointTransitionDuration={500}
    //       backgroundColor={darkMode ? "rgba(0,0,0,1)" : "rgba(255,255,255,1)"}
    //     />
    //   </div>
    // </div>
  );
}

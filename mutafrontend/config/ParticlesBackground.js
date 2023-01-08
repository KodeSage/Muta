import React, { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import particlesConfig from "./particles-config";

const ParticlesBackground = () =>
{
    const particlesINit = useCallback( async ( engine ) =>
    {
        await loadFull( engine );
    }, [] );

    const particlesLoaded = useCallback( ( container ) =>
    {
        // container.refresh();
        console.log("Particles loaded", container);
    }, [] );

    return (
        <div id="particles-background">
            <Particles
                id="tsparticles"
                particlesLoaded="particlesLoaded"
                init={ particlesINit }
                loaded={ particlesLoaded }
                options={ particlesConfig }
                height="100vh"
                width="100vw"
            >
            </Particles>
        </div>
    )
}

export default ParticlesBackground;
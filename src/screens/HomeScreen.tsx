
const HomeScreen = () => {

    return (
        <>
            <div className="home-card">
                <div>
                    <img
                      src="/images/logo.png"
                      alt="Logo Cartographe"
                      className="home-emblem"
                    />
                    <h1 className="home-title">Cartographe</h1>
                    <span className="home-subtitle">Le carnet et la carte des tes campagnes</span>
                </div>
                <div className="home-divider"></div>
                <div>
                    <div className="home-option home-option--create">
                        <h2>Créer un JDR</h2>
                    </div>
                    <div className="home-option">
                        <h2>Ouvrir un JDR</h2>
                    </div>
                </div>
                <span className="home-footnote">Chaque campagne vit dans son propre fichier JSON. Enregistrement direct sous le navigateur, téléchargement sinon.</span>
            </div>
        </>
    )
}

export default HomeScreen;
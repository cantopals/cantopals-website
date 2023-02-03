const Logo = () => {
    return (
        <>
            <img className="uk-visible dark:uk-hidden" width="120" src="/images/canto-pals-dark.svg" alt="Nerko" loading="lazy" />
            <img className="uk-hidden dark:uk-visible" width="120" src="/images/canto-pals-dark.svg" alt="Nerko" loading="lazy" />
        </>
    )
}

export default Logo;
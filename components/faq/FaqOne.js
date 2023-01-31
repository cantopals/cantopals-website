import Link from "next/link";

const FaqOne = () => {
    return(
        <>
            <div id="uni_faq" className="uni-faq uk-section uk-section-large@m uk-panel uk-overflow-hidden uk-padding-2xlarge-bottom@m">
                <div className="uk-container">
                    <div className="uk-panel uk-margin-medium-top uk-margin-2xlarge-top@m">
                        <ul className="uk-card uk-card-small uk-card-large@m uk-radius uk-radius-large@m uk-width-2xlarge@m uk-margin-auto uk-box-shadow-xsmall dark:uk-background-white-5" data-uk-accordion="collapsible: false" data-anime="opacity:[0, 1]; translateY:[24, 0]; onview: true; delay: 100;">
                            <li>
                                <div className="uk-accordion-content uk-padding-small-bottom">
                                    <p className="uk-text-small uk-text-large@m uk-text-muted">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat proident.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FaqOne;
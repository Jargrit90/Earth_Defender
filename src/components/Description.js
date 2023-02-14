import React from "react";
import '../index.css';
import './desc.css';

import {useSelector, useDispatch} from 'react-redux';

function Opis() {
    const dispatch = useDispatch();
    return (
        <>
            <div className="opis flexCC">
                <div className="close flexCC" onClick={()=>dispatch({type: 'toggleInfo', payload: null})}>X</div>
                <div>
                    Siądź za sterami pojazdu i zniszcz nadciągające fale złowrogich kosmitów chcących zniszczyć planetę Ziemię.<br />
                    Co jakiś czas czeka Cię spotkanie z jednym z szefów, który to jest dużo bardziej wymagający niż jego podwładni.<br />
                    Zdobywaj doświadczenie, zdobywaj osiągnięcia, wbijaj poziomy i wzmacniaj swój pojazd, powiększając podstawowe statystyki pojazdu i odblokowywując
                    i rozwijając kolejne narzędzia do eksterminacji wrogich oddziałów.<br /><br/>
                    STEROWANIE<br/>
                    Sterowanie odbywa się za pomocą myszki, klawisz spacja odpowiada za otwarcie drzewka umiejętności.
                </div>
            </div>
        </>
    )
}

export default Opis;

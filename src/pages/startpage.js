import '../style_sheets/start.css';

export function StartPage() {
    return(
        <div id="startDiv">
            <div id="titleStart"><br/ ><u>Game Functions (READ ME)</u></div>
            <br />
            <div id="bodyStart">
                <b>Note:</b> This projected was completed in a week. There may be bugs.
            </div>
            <div id="bodySecond">
                <br />
                1. You get 1000 won every 30 minutes.
                <br />
                2. Get cards by buying packs.<br />
                3. View your inventory and sell unwanted cards by clicking on them.<br />
                4. Trade your cards for other cards or won. <br />
                5. Everyday, a random mythic card appears in the auction (500k to 1m won)<br />
                <br />
                <div id="packChance"><u>Pack Chances:</u> Common Pack(70% common, 25% rare, 5% epic); Rare Pack(15% common 70% rare 15% epic); Epic Pack(20% rare, 70% epic 10% legendary); Legendary Pack(20% epic, 80% legendary)</div>
            </div>
        </div>
    )
}
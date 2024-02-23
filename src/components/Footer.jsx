import moment from "moment";

export function Footer() {
    return (
        <footer className={"flex flex-col items-center text-center gap-4 p-3 mt-10"}>
            <div className={"flex flex-col"}>
                <h4 className={"text-xl font-bold"}>Team</h4>
                <span className={"text-xs font-extralight"}>
                    Artem Gaus, Jannis Bressan, Julius Müller, Lorenz Kehl,<br/>
                    Lukas Lukjanow, Maik Scherer, Pierre Nitschke, Timo Bühler, Yannick Stock
                </span>
            </div>
            <span className={"text-xs font-extralight"}>
                © {moment().year()} — ProfPlaner
            </span>
        </footer>
    )
}
interface props {
    nombre : string;
    descripcion : string;
}

export const Detalles = ({nombre, descripcion} : props) => {
    return (
        <div className="py-5">
            <details className="group">
                <summary className="flex justify-between items-center font-normal text-lg cursor-pointer list-none">
                    <span> {nombre} </span>
                    <span className="transition group-open:rotate-180">
                        <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
                        </svg>
                    </span>
                </summary>
                <p className="mt-3 group-open:animate-fadeIn">
                    {descripcion}
                </p>
            </details>
        </div>
    )

}
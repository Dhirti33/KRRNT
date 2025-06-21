const Weather = () => {
    return (
        <div className="weather h-30 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl shadow-lg px-3 py-2 flex flex-col items-center justify-center">
            <div className="location text-base font-semibold text-blue-800 mb-1">
                Lagos, Nigeria
            </div>
            <div className="grid grid-cols-3 gap-2 items-center w-full">
                {/* Weather Icon */}
                <div className="flex items-center justify-center col-span-1">
                    <svg className="w-9 h-9 text-yellow-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="5" fill="currentColor" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.07-7.07l-1.42 1.42M6.34 17.66l-1.42 1.42m12.02 0l-1.42-1.42M6.34 6.34L4.92 4.92" />
                    </svg>
                </div>
                {/* Main Weather */}
                <div className="flex flex-col items-start col-span-1">
                    <div className="text-xl font-bold text-blue-700 leading-none">29°C</div>
                    <div className="text-sm text-blue-600 leading-none">Sunny</div>
                </div>
                {/* Extra Details */}
                <div className="flex flex-col items-start col-span-1">
                    <div className="text-xs text-blue-500 leading-none">Humidity: 65%</div>
                    <div className="text-xs text-blue-500 leading-none">Wind: 12 km/h</div>
                </div>
            </div>
        </div>
    )
}

export default Weather
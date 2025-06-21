const Trending = () => {
    return (
        <div className="trending p-6 flex flex-col gap-5 h-130 ">
            <h3 className="text-xl font-bold text-blue-800 mb-2">What&apos;s happening</h3>
            <div className="flex flex-col gap-3 overflow-y-auto scrollbar-hide pr-2 h-full">
                <div className="trend flex flex-col gap-1 p-4 bg-white/80 rounded-xl border border-blue-100 shadow">
                    <h5 className="text-xs text-blue-500 font-semibold uppercase tracking-wide">Trending in Ghana</h5>
                    <h4 className="text-lg font-bold text-gray-800">#Trend</h4>
                    <span className="text-xs text-gray-500">12.3K Tweets</span>
                </div>
                <div className="trend flex flex-col gap-1 p-4 bg-white/80 rounded-xl border border-blue-100 shadow">
                    <h5 className="text-xs text-blue-500 font-semibold uppercase tracking-wide">Trending in Nigeria</h5>
                    <h4 className="text-lg font-bold text-gray-800">#Naija</h4>
                    <span className="text-xs text-gray-500">8.7K Tweets</span>
                </div>
                <div className="trend flex flex-col gap-1 p-4 bg-white/80 rounded-xl border border-blue-100 shadow">
                    <h5 className="text-xs text-blue-500 font-semibold uppercase tracking-wide">Trending in Africa</h5>
                    <h4 className="text-lg font-bold text-gray-800">#AfricaRising</h4>
                    <span className="text-xs text-gray-500">21.1K Tweets</span>
                </div>
                {/* Add more trends as needed */}
            </div>
        </div>
    )
}

export default Trending;
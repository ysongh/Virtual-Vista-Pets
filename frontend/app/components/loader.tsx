export default function Loader() {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="relative mb-4">
                {[...Array(3)].map((_, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 rounded-full border-2 border-transparent border-t-yellow-500 border-r-yellow-500
                                animate-spin`}
                    style={{
                    animationDuration: '1.5s',
                    animationDelay: `${index * 0.2}s`,
                    width: `${(index + 3) * 12}px`,
                    height: `${(index + 3) * 12}px`,
                    }}
                ></div>
                ))}
            </div>
        </div>
    );
}
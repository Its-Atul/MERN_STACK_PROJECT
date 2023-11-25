const Tab = ({ tabData, field, setField }) => {
    return (
        <div className="flex bg-richblack-800 p-1 gap-2 my-6 rounded-full max-w-max border-b-2  border-richblack-500 font-inter font-semibold">
            {
                tabData.map((tab) => {
                    return (
                        <button key={tab.id}
                            onClick={() => setField(tab.type)}
                            className={`${field === tab.type ? " bg-richblack-900 text-richblack-5" : " bg-transparent text-richblack-300"
                                } py-2 px-5 rounded-full transition-all duration-300`}
                        >
                            {tab?.tabName}
                        </button>
                    )
                })
            }
        </div>
    );
}

export default Tab;

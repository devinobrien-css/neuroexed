

const DateCard = (args) => {
    const date = args.date
    const months = {
        '1':'JAN',
        '2':'FEB',
        '3':'MAR',
        '4':'APR',
        '5':'MAY',
        '6':'JUN',
        '7':'JUL',
        '8':'AUG',
        '9':'SEP',
        '10':'OCT',
        '11':'NOV',
        '12':'DEC'
    }

    return (
        <div className='flex flex-col z-50'>
            <div className='mx-auto rounded shadow-lg group relative'>
                <p className='bg-gray-400 text-gray-100 px-2 rounded-t'>{months[date[0]]}</p>
                <p className='mx-auto text-center bg-white group-hover:rounded-none'>{date[1]}</p>
                <p className='mx-auto text-center bg-white rounded-b border-t bg-opacity-90 w-full'>{'20'+date[2]}</p>
            </div>
        </div>

    )
}
export default DateCard;
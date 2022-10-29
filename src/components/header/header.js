const Header = ({content,subtext}) => {
    return (
        <div 
            className='bg-cover shadow p-2 text-white mb-2 bg-dark-hex bg-bottom'
            // style={{backgroundImage:"url('./hex-bg.png')"}}
        >
            <p className="text-3xl md:text-5xl">{content}</p>
            <p className="italic md:text-xl">{subtext}</p>
        </div>
    );
}

export default Header
const Header = ({content,subtext}) => {
    return (
        <div className='bg-cover shadow-lg p-2 text-white my-4 bg-dark-hex bg-center'>
            <p className="text-3xl md:text-5xl">{content}</p>
            <p className="italic md:text-xl">{subtext}</p>
        </div>
    );
}
export default Header
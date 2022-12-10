import { SubTitleMd, TitleXl, Wrapper } from "./common.library";
import Nav from "./nav.component";

const Header = ({content,subtext}) => {
    return (
        <>
            <Wrapper className="overflow-visible min-h-48" id="header">
                <div className="bg-white w-[95%] mx-auto -mt-8 shadow-xl shadow-gray-800 rounded p-4">
                    <TitleXl className="text-center">{content}</TitleXl>
                    <SubTitleMd className="text-center text-gray-700">{subtext}</SubTitleMd>
                </div>
                <br/>
            </Wrapper>
            <Nav />
        </>
    );
}
export default Header
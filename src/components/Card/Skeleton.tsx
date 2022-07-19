import ContentLoader from 'react-content-loader';

function Skeleton(): JSX.Element {
    return (
        <ContentLoader
            speed={2}
            width={280}
            height={465}
            viewBox="0 0 280 465"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <rect x="0" y="270" rx="10" ry="10" width="260" height="27"/>
            <rect x="0" y="310" rx="10" ry="10" width="260" height="88"/>
            <rect x="0" y="425" rx="10" ry="10" width="91" height="27"/>
            <rect x="130" y="415" rx="10" ry="10" width="130" height="44"/>
            <circle cx="130" cy="130" r="130"/>
        </ContentLoader>
    );
}

export default Skeleton;

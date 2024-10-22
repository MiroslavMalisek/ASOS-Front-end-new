import './SideBar.css'

const SideBar = () => {
    return(
        <div className="col col-lg-2 side-bar-container p-0">
            <div className="category-item p-2">
                <a href="/contact" className="my-link">First category</a>
            </div>
            <div className="category-item p-2">
                <a href="/contact" className="my-link">Second category</a>
            </div>
            <div className="category-item p-2">
                <a href="/contact" className="my-link">Third category</a>
            </div>
            <div className="category-item p-2">
                <a href="/contact" className="my-link">Fourth category</a>
            </div>
            <div className="category-item p-2">
                <a href="/contact" className="my-link">Fifth category</a>
            </div>
            <div className="category-item p-2">
                <a href="/contact" className="my-link">Sixth category</a>
            </div>
        </div>
    );
};

export default SideBar;
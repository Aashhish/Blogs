import { BiSearchAlt } from "react-icons/bi";
import { getBlog, getFilterPost, getSearch } from "../endpoints";
import { useEffect, useState } from "react";
import "./NavBarLower.css"



const NavBarLower=({setPost})=>{
    const [blogs, setBlogs] = useState([]);
    const [Title, setTitle] = useState("");
    const [createdDate, setcreatedDate] = useState("")
    const [searchText, setsearchText] = useState("")

    const FetchDetails=async()=>{
        try{
            const res = await getBlog()
            if(res.data){
                setBlogs(res.data)
            }
        }catch(err){
            console.log(err, "error getting Blogs in DropDown")
        }
    }

    const filterByTitle =async()=>{
        try{
            const res = await getFilterPost(Title, createdDate);
            setPost(res.data);
        }catch(err){
            console.log(err)
        }
    }

    const filterByDate=(date)=>{
        console.log(date, "date");
        setcreatedDate(date)
    }


    const search =()=>{
        try{
            const res = getSearch(searchText);
            setBlogs(res.data);
        }catch(err){
            console.log(err, "Error searching blogs")
        }
    }


    useEffect(()=>{
        FetchDetails();
        // search();

    },[])

    useEffect(()=>{
        filterByTitle();
    },[Title,createdDate])
    return(
        <>
        <div className="LowerNavBar">
        <span className="filter">Filters</span>
                    <hr className="line2"></hr>
                    <span className="h1">Created By</span>
                    <span className="h2">Pusblished Date</span>
                    <span className="h3">Search</span>
                    <div className="Navbar-Inputs">
                        <select className="in1"
                        value={Title}
                        onChange={(e) =>
                          setTitle(e.target.value === "All" ? "" : e.target.value)
                        }>
                            <option value="All">All</option>
                            {blogs.map((post) => {
                            return (
                                <option key={post._id} value={post.Title}>
                                {post.Title}
                                </option>
                            );
                            })}
                            {/* <option value={2}>FrontEnd</option>
                            <option value={3}>Backend</option> */}
                        </select>
                        <input type="date" className="in2" onChange={(e)=> filterByDate(e.target.value)}></input>
                    </div>

                        <div className="picon">
                            <div className="icon"><BiSearchAlt /></div>
                            <div><input className="txtbox" type="text" placeholder="Type Here"></input></div>
                        </div>
                        </div>
        </>
    )
}
export default NavBarLower;
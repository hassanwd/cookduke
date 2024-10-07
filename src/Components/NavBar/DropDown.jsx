import React,{useState,useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from "react-i18next";
import { BiChevronDown } from "react-icons/bi";
import {ListGroup} from 'react-bootstrap';
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import {Link} from "react-router-dom"
import { logout,getUserDetails } from "../../Actions/userActions";
import { genPublicURL } from '../../config';


const LanguageSelect = (props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch()

    const user = JSON.parse(localStorage.getItem('sign_up'))
    
    // console.log(userInfo);

    // const [user,newUser]=useState(userInfo)
    // console.log(user);
    const [pic,setPic]=useState("https://colegioclassea.com.br/wp-content/themes/PageLand/assets/img/avatar/avatar.jpg")

// useEffect(()=>{
//     if(userInfo){
//         newUser(userInfo?.user)
//         setPic(userInfo?.user?.profilePicture===undefined ? "https://colegioclassea.com.br/wp-content/themes/PageLand/assets/img/avatar/avatar.jpg":genPublicURL(userInfo?.user?.profilePicture))
//     }

// },[userInfo])


const updateUserProfile = useSelector((state) => state.updateUserProfile)
const { userData } = updateUserProfile
const umessage = userData?.message

useEffect(() => {
    if (umessage === "user updated successfully") {
      setPic(genPublicURL(userData?.user?.profilePicture))
    }
  }, [umessage])

    const logOut=()=>{
        localStorage.removeItem("token")
    }

    const [menuAnchor, setMenuAnchor] = React.useState(null);

    return (
        <div className="d-flex justify-content-center align-items-center">
            <Button onClick={({ currentTarget }) => setMenuAnchor(currentTarget)} className="drop_down">
                <img className="user_img" src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAjVBMVEX///8AAADa2tr7+/vk5OT4+Pjo6Ojv7+9vb2/y8vLn5+fd3d20tLR8fHzr6+u5ubmXl5elpaVERETMzMwqKiqfn5+tra07OzvDw8MODg6jo6M1NTXT09NKSkoSEhK9vb0hISGOjo5nZ2eAgIBQUFA4ODhgYGAaGhqGhoYnJydAQEB1dXVYWFhPT09ra2u2HNU2AAAJjElEQVR4nO2di17yPAzGGQw5HwTGQUAYHlBB7//yPtAPRdZtSZ605fW3/wWsDWxtmjxJS6WCgoKCgoIClzSarXK51QrDm4bvqahSG7b7u+dRcMl804l6i1rF9/wQqou7ztssYdoFbw/jhe+ZSgjHu3Webed/6K4d+p4yg0avnvvPGbj/6FV9T51CGC0F1p1YRlf+Vzb7r4B5X8yjG99mpFFpI//eOYO2b1tMlHdK5n3Rafk26ILho6p9R95Wvo06YzVXt+/IbOzbsP9pczY+Jn3fxh1ob+3Zd+TWs31Ti//f/8x6Hu0rD6zbd2Tky29t1J3Yd6TuxZ1rO7PviPtltavlv1CZOHZYbx3bd8TlzlHV92AoTLquDBx6se+II4+8483Aw6LqwL7axKOBh73R+pvq7w09MbVrYN+3fQfubBqoe8qVsrNnoJ9NIsmjJfuqds65EkZW/NTavW+7zphZWFJvfBt1gbqb2vJtUQJlE7UM3I4m81dJyN+AqokhPp/naHhzyqRVm9NYYV1WjI3D3+CDKQ6xeEAfq7bcNLB5DNL9rNUT9OSZ0qZRSeZvGezLmQ8fQrGCkU4G+R2YwnaY+/gpss8uNQxEfFFa4CEGRlA4MEby0e+p+aMysH9EqIHAeXBPH6UKhJbB82JNPnKHNdCzfKAaZKH8OBEzR5Jvjk+IgfK4/Qt7LPmK9iA3cCUeVLLE7cWjiT9F+Uc4EI0n9yykn6J8gZMp87ri8YQbv3wnzHdkzPTEI4oyxU3xcPJYmHzPkLyn8ndU7g7Lv3xB+G0sHgxJZsojzuxsv/zXXAMGliriYdlvzkY8EpYBk/+JPC+xtBAPFEAGIn8iLzIlT6GhuWh5dpK12Mg3JjjGB7w9nG1YfiKdgAaWSnIV2Yg+CKC0wAUTQIyRvsjJxwiyI2sUpvLB76ljAKEZcCU9UgVGJ/6JwIIdvOMWAh9isKaNIPfXoOP2N3JnIwhoymkkQqshsIuB8UnLKfClU3/DbJB3iLQnQokEDbEL9BMTFgIsF6qh5gW8mgP5cXZMtaZRB1KGZpB7xEC2ikBjw0ctzD0ngtpm/29p7q4Pqu+9rzS5kUU0Y68hcUUl8s3MpyMu6RE4m2d9DlDKPtCRDaJlHPOsh8O6mTcFCzF9RpAdZkBfEI3TE3I6/SJLYovXMeHbBbhZBJmrKZDTPoFHMWJ8EumpL4VSJvxDVNDppp9wNIrR0GiihgoyfUXXkEWir2msMIfUiJSCxjKAV1OVOaS5NdDh+hvsmK8zhzTnUacmNNOlyEWnrjjtkKgkxkf+RJ2/MC0gBQplvyFHng0oTSHlGKxWtMUVfP0A66JPmF0r3Ck9IY1l4A7bCbP6RK/4fCu0UKlMIUhbahTLmjYiAwEF5iVG5xHJ+SSQnPVjxfFnpgHkqjIT/ICN3jJwxKSRUq5/5e6KyhX+psVUuwsELw0VK49ukkhpj8HaFtXLb00LgX6nkj21aKcGB58SmLYLuQg5HVoIXMkZ/cWzYRwr3YI+8tXCN1bqp026HhvjHOhnv6qNFzvDmjZEOyMdeEkvE2zZ67GRHEzVpbng0djUsntrs8WGYTyLox1Y9ofnbkZ3+mK5uj+5AOiEobIZPe92u3p9jzfIzCfptl1fOTpGsgwazJ5fHcnI9F+zMKkK+fsW/rXvMGmhi7XUJcnv8K9ZmFxLr607C0pyP7TptfnAcKjxPSVlkgYWFv5jmNJD+rESn5iC3ohE/vow5RWuo5+eFqZY2zW0RNTDpPwCKvKSvHei3nRYpjKc9m5fFFNP5qSCWnpyL75Q5aatZqUpb6EgajuwbIPdqaY6kWlT7glU6X/SyVYg0+jG+ETMagk4tlfHeuH8UIXDxObWI+B28aRRa3EiBJWu5hq6O+iZcomJGWw2ZpkwlASWtjNJBwocmacDnBDXWl/gr/kAC0PKgi4ORT9Zuh5OvHG8pjxQutSotPYzInUA0kTCwlwsJrfMRljumaaSkIXb7q3eHyIr4kl1G0UCU7s3a4h8yXT9p0SOYftCBkmtXnq3OMEBSqbR4yBY/9I7KglUwg4u8eFPKkMAwvYGXVzhw36zsnYvrj5w7cDAUumNOass6Sd3v3BzgR/XYc5c3XnbD6LK58CTbaS5bF/wXlNX99rxvsRsfTIvx+bs8mnWrHI6tXMcQZP+zw6cPTHvHMBRCru7mJCz1uQ6WYxnObyyjzGr3GfR1YIalelU6Gfh/PaJdNWJRk8oKvSkCqF/DNlzc3nxMvmEQWk2Rm5xrRkfzYPsbJGU5dSH2YivpUGNA9JqyqjVK5aN+g1xTsQvh/YwY/GUNWiRTuqcaAH1tUV7ktCiw2RHmfQ0RrdQBWhFGeTHkb5EaaGoDNIexjjrkMpV7ZljgFLRwzmukg5kzu6uLRET1KyIA0UgZflC0F9QUm08P5kizGC2CIeg+KVMH+uD8EhLOTUThHwD91oUSnDY3UXZlHM5+7RK2TGceaaEtV0QmyaE8OylRn9D+GQkx3HKgYV/55EEyjIjuu0xJjxYW2NighLDFd7zTAk1f+haY4ASOJLdvkQMD8/thoVpd86Jlzxa8FRfLPQDTRIKJIhoaW97+yItjQK1FKUdrQd2NsYaLewH3Z1HvtbKRi6YKu8Bf15qbHGpeP3wJ2T9JbwMxMSBlL9GsoZWuBOeQ9aWzfSC4HT9mUbjYka50KvOobhH12Zp3Bhy2HQZYrCMG6qptBlNVrREg6yGEiPoXa2w2kVp3cvNFqHE0pqEkNlVUDEWxtVcvwvqShpjriJLo7jjG37J0GbFCeM0enw5sLLsU1IVtb+jXeixiCRSYHVdq7DnwnN/mvG1VMJVLBQ6a/tQJaglwfIhWpXD84Nko7Vo9zdcSd4PWysB9wbeDex+vd1qtPCcWwrVIne8q8K4l54LJRJuH6vphGsoFrasiJRft66FzbDQJ00XjbrSGVnYJRLoN8mko3IczEe7lysdZ3rPpp8eGm8u8+qxBwM17pJi0LLc9jDBRPWsRAIrRebiUur5TU21kUUmHYeC618s3LyqA417I6X09Jr9pzFyqdsxodxL/RLFMLMcm964i+o/AhVLy+r2Suz7ZPWubt+j7+/vEuXG1Q8+1880Km3oOugz9m4qNyWEfTxaNYpcljkIaPXlMcIgeI/sNjBQotauSxyB7c7Yuv1aCcf1LcO6wUvP5eFPi+rwrpNfJzHpjF1WUOlT6Q57UWczuPxHt4NNJ+oNuw6Fxvap1rphq9UKu7V/6XsrKCgoKCj4C/wHLTOpWntaVO4AAAAASUVORK5CYII="} alt="" />
           {user &&  user?.firstName}<BiChevronDown />
            </Button>
            <Popover
                open={!!menuAnchor}
                anchorEl={menuAnchor}
                onClose={() => setMenuAnchor(null)}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
            >
                <div className="list_menu">
                    <ListGroup variant="flush">
                        {user && user?.role==="chef"?<ListGroup.Item><Link to="/chef/profile">Profile</Link></ListGroup.Item>:null}
                        {user && user?.role==="restaurant"?<ListGroup.Item><Link to="/restaurant/profile">Profile</Link></ListGroup.Item>:null}
                        {user && user?.role==="user"?<ListGroup.Item><Link to="/profile">Profile</Link></ListGroup.Item>:null}
                        <ListGroup.Item><Link to="/">Feed Page</Link></ListGroup.Item>
                        {user && user?.role==="chef"?<ListGroup.Item><Link to="/chef/dashboard">Chef Dashboard</Link></ListGroup.Item>:null}
                        {user && user?.role==="restaurant"?<ListGroup.Item><Link to="/restaurant/dashboard">Restaurant Dashboard</Link></ListGroup.Item>:null}
                        <ListGroup.Item><Link to="/login"><span onClick={logOut}>Logout</span></Link></ListGroup.Item>
                    </ListGroup>
                </div>
            </Popover>
        </div>
    );
};

export default LanguageSelect;
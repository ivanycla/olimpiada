import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CardList from "../comp/UI/CardList/CardList.jsx";
import Map from "../comp/UI/Map/Map.jsx";
import FindFriend from "../comp/UI/FindFriend/FindFriend.jsx";
import FilterButton from "../comp/UI/FilterButton/FilterButton.jsx";
import Notification from "../comp/UI/Notification/Notifcication.jsx";
import styles from '../styles/UserPage.module.css'


const UserPage = () => {
    const [mock] = useState([
            {
                name: "Концерт маканчика",
                description: `Подо мной M5, Asphalt 8...`,
                format: "Оффлайн",
                place: "Минск, пр. Независимости, 58",
                coordinates: { lat: 53.902257, lng: 27.561824 },
                duration: "Жалко что не всю жизни",
                date: "03.05.2025",
                info: "Подо мной M5, Asphalt 8...",
                tags: ["offline", "macan", "music"],
                img: "https://cdn.promodj.com/afs/4f675099712b583994da2c9fe5782c7c12%3Aresize%3A2000x2000%3Asame%3Ab3b350"
            },
            {
                name: "Концерт иваназоло",
                description: `Лаванда, меня уносит правда...`,
                format: "Оффлайн",
                place: "Минск, ул. Немига, 5",
                coordinates: { lat: 53.904539, lng: 27.561523 }, 
                duration: "Жалко что не всю жизни",
                date: "10.05.2025",
                info: "Лаванда, меня уносит правда",
                tags: ["offline", "ivanzolo", "music"],
                img: "https://uznayvse.ru/images/content/2022/3/blogger-ivan-zolo_100.jpg"
            },
            {
                name: "Пиздим лазовского",
                description: `Та просто отпизидим его`,
                format: "Оффлайн",
                place: "БГАС, Минск",
                coordinates: { lat: 53.930887, lng: 27.651634 },
                duration: "Жалко что не всю жизни",
                date: "08.04.2025",
                info: "заебал",
                tags: ["offline", "fight"],
                img: "https://sun9-73.userapi.com/impf/mk2xRlNqECIqmVBF9q1xbxY0a6xS5ArgBq5DtA/MxTv32K_9sg.jpg?size=1818x606&quality=95&crop=0,191,1500,500&sign=74cfa2b24e8d68f431fafc9f34b1144c&type=cover_group"
            },
            {
                name: "Турнир по экселю",
                description: `Гладун судья`,
                format: "Онлайн",
                place: "БГАС, Минск",
                coordinates: { lat: 53.930887, lng: 27.651634 },
                duration: "10 минут",
                date: "20.04.2025",
                info: "gladunchik",
                tags: ["online", "gladun"],
                img: "https://res.cdn.office.net/apphome/excelogimage.png"
            }
        ]);
    

    const navigate = useNavigate();
    const [flagFindFriend,setFlagFindFriend]=useState(false);
    const [isLog,setIsLog]=useState(true);
    const [flagNotif,setFlagNotif]=useState(false);
    const [filter, setFilter] = useState('all')
    function handleFilter(e, type){
        setFilter(type)
        e.target.className = 'active'
    }

    const mapMarkers = mock.map(event => ({
        lat: event.coordinates.lat,
        lng: event.coordinates.lng,
        title: event.name,
        info: event.info
    }));
    const handleProfileClick=()=>{
        navigate("/Profile")//navigate("/Profile/{userId},{{state:userId}}");
    }
    const handleFindFriend= () =>{
        setFlagFindFriend(true);
    }
    return (
        <div className="guest-page">
            <header style={{ padding: "20px", display: "flex", justifyContent: "space-between" }}>
                <button className={styles.button} onClick={handleProfileClick}>
                    Профиль
                    </button>
                    <button className={styles.button} onClick={handleFindFriend}>
                        Поиск пользователей
                    </button>
                    
            <button className={styles.button}
            onClick={()=>setFlagNotif(true)}
            >Уведомления</button>
            {
                flagNotif &&(
                    <Notification
                    flagNotif={flagNotif}
                    onClose={()=>setFlagNotif(false)}
                    />
                )
            }
            </header>
            {flagFindFriend && (
            <div className="find-friend-container">
                <FindFriend />
            <button className={styles.button} onClick={() => setFlagFindFriend(false)}>Закрыть</button>
                </div>
)}         
            <div style={{ padding: "20px" }}>
                {/* Карта */}
                <div style={{ marginBottom: "40px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                    <Map markers={mapMarkers} />
                </div>
                
                <div className={styles.filterList}>
                    <h1>Фильтры по мероприятиям</h1>
                    <FilterButton onClick={() => {setFilter('all')}} isActive={filter === 'all'}>Все</FilterButton>
                    <FilterButton onClick={() => {setFilter('offline')}} isActive={filter === 'offline'}>Оффлайн</FilterButton>
                    <FilterButton onClick={() => {setFilter('online')}} isActive={filter === 'online'}>Онлайн</FilterButton>
                    <FilterButton onClick={() => {setFilter('music')}} isActive={filter === 'music'}>Музыка</FilterButton>
                </div>
                
                <CardList events={mock}
                isLog={true} filter={filter}
                //userId={userdId}
                />
            </div>
        </div>
    );
};

export default UserPage;

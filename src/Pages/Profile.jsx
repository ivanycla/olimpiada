import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../comp/UI/Card/Card";
import styles from '../styles/Profile.module.css'

const Profile = () => {
    const defaultProfileName = "Имя не заполнено"
    const [bio, setBio] = useState(localStorage.getItem("bio") || "");
    const [name, setName] = useState(localStorage.getItem("name") || defaultProfileName);
    const [events, setEvents] = useState([]);
    const [favoriteEvent, setFavoriteEvent] = useState([]);
    const [favoriteEventFlag, setFavoriteEventFlag] = useState(false);
    const [friends, setFriends] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
       
        const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
        const storedFavorites = JSON.parse(localStorage.getItem("FavoriteEvents")) || [];
        const storedFriends = JSON.parse(localStorage.getItem("friends")) || [];
        
        setEvents(storedEvents);
        setFavoriteEvent(storedFavorites);
        setFriends(storedFriends);
    }, []);

    const saveInfo = () => {
        localStorage.setItem("bio", bio);
    }; 

    const saveName = () => {
      localStorage.setItem("name", name);
  }; 
    

    return (
        <div className={styles.profileContainer}>
          <h1 style={{marginTop: '50px'}}>Профиль{name === defaultProfileName ? "" : " "+name}</h1>
          <div className={styles.mainInfoSection}>
            <form className={styles.infoSection}>
                <label className={styles.label} htmlFor="name">Имя</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ваше имя ( видно всем )"
                    name='name'
                />
                <label className={styles.label} htmlFor="bio">О себе</label>
                <input
                    type="text"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Расскажите о себе"
                    name='bio'
                />
                <button type="button" className={styles.button} onClick={() => {saveInfo(); saveName()}}>
                    Сохранить
                </button>
            </form>
            <div className={styles.friendsSection}>
                <h3>Мои друзья ({friends.length})</h3>
                <div className="friends-list">
                    {friends.map((friend, index) => (
                        <div key={index} className="friend-item">
                            {friend}
                        </div>
                    ))}
                </div>
            </div>
            </div>
               
            <p className="email">Почта: {localStorage.getItem("email")}</p>

           
            

            <div style={{ margin: "10px 0" }}>
                <input 
            type="checkbox" 
            name="flag" 
            id="flag" 
            onChange={(e) => setFavoriteEventFlag(e.target.checked)}
  />
  <label htmlFor="flag" className={styles.label}>
   Показывать избранные мероприятия
  </label>
                </div>

        <div className={styles.eventList}>
          {favoriteEventFlag ? (
            favoriteEvent.length > 0 ? (
              favoriteEvent.map((event, index) => (
                <Card
                  key={`favorite-${index}`}
                  name={event.name}
                  format={event.format}
                  description={event.description}
                  place={event.place}
                  duration={event.duration}
                  date={event.date}
                  info={event.info}
                  tags={event.tags}
                  img={event.img}
                />
              ))
            ) : (
              <p className="empty-message">Нет избранных мероприятий</p>
            )
          ) : (
            events.length > 0 ? (
              events.map((event, index) => (
                <Card
                  key={`event-${index}`}
                  name={event.name}
                  format={event.format}
                  description={event.description}
                  place={event.place}
                  duration={event.duration}
                  date={event.date}
                  info={event.info}
                  tags={event.tags}
                  img={event.img}
                />
              ))
            ) : (
              <p className="empty-message">Нет запланированных мероприятий</p>
            )
          )}
        </div>
      </div>
    
  );
};

export default Profile;

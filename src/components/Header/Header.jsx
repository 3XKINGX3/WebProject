import React, { useState } from 'react';
import './Header.css';

const Header = () => {
    const [isGamesMenuOpen, setIsGamesMenuOpen] = useState(false);
    const [selectedGame, setSelectedGame] = useState('Mobile Legends: Bang Bang');
    
    const menuItems = [
        { id: 1, name: 'Главная', path: '/' },
        { id: 2, name: 'Раздача', path: '/giveaway' },
        { id: 3, name: 'Отзывы', path: '/reviews' },
        { id: 4, name: 'Поддержка', path: '/support' },
        { id: 5, name: 'Блог', path: '/blog' },
    ];

    const games = [
        { 
            id: 1, 
            name: 'Mobile Legends: Bang Bang', 
            icon: '📱', 
            logo: '/MLBB.png',
            currency: 'Алмазы',
            description: 'Мгновенное пополнение алмазов в Мобайл Легенд по ID. Любые пропуска и удвоение первой покупки.',
            info: 'Алмазы — внутриигровая премиальная валюта в Mobile Legends Bang Bang, которая необходима для покупки героев и открытия новых костюмов.'
        },
        { 
            id: 2, 
            name: 'League of Legends', 
            icon: '⚔️', 
            logo: '/LOL.png',
            currency: 'RP',
            description: 'Мгновенное пополнение RP в League of Legends по ID. Любые скины и чемпионы.',
            info: 'RP (Riot Points) — премиальная валюта в League of Legends для покупки скинов, чемпионов и другого контента.'
        },
        { 
            id: 3, 
            name: 'PUBG MOBILE', 
            icon: '🎯', 
            logo: '/PUBG.png',
            currency: 'UC',
            description: 'Мгновенное пополнение UC в PUBG MOBILE по ID. Любые скины и оружия.',
            info: 'UC (Unknown Cash) — премиальная валюта в PUBG MOBILE для покупки кейсов, скинов и предметов в игре.'
        },
    ];

    const toggleGamesMenu = () => {
        setIsGamesMenuOpen(!isGamesMenuOpen);
    };

    const handleGameSelect = (gameName) => {
        if (gameName !== 'Mobile Legends: Bang Bang') {
            alert('В данный момент доступны только товары для Mobile Legends: Bang Bang. Скоро добавим другие игры!');
            return;
        }
        setSelectedGame(gameName);
        setIsGamesMenuOpen(false);
    };

    const selectedGameData = games.find(game => game.name === selectedGame) || games[0];

    return (
        <header className="header">
            <div className="header-video-container">
                <video autoPlay loop muted playsInline>
                    <source src="/Video.mp4" type="video/mp4" />
                </video>
                <div className="header-video-overlay"></div>
            </div>
            
            <div className="top-header">
                <div className="header-container">
                    <div className="site-brand">
                        <div className="logo-container">
                            <img 
                                src="/LOGO.png" 
                                alt="Mobpay" 
                                className="site-logo"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextElementSibling.style.display = 'flex';
                                }}
                            />
                            <div className="logo-fallback">
                                <span className="logo-emoji">🎮</span>
                            </div>
                        </div>
                        <div className="site-name">
                            <h1 className="site-title">Mobpay</h1>
                            <span className="site-tagline">Играйте с нами!</span>
                        </div>
                    </div>

                    <nav className="main-nav">
                        <ul className="nav-list">
                            {menuItems.map(item => (
                                <li key={item.id} className="nav-item">
                                    <a href={item.path} className="nav-link">
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="header-actions">
                        <div className="games-dropdown">
                            <button 
                                className="games-select-btn" 
                                onClick={toggleGamesMenu}
                            >
                                <span className="games-btn-text">Выбрать игру</span>
                                <span className={`dropdown-arrow ${isGamesMenuOpen ? 'open' : ''}`}>
                                    ▼
                                </span>
                            </button>
                            
                            {isGamesMenuOpen && (
                                <div className="games-dropdown-menu">
                                    <div className="games-dropdown-header">
                                        <span className="dropdown-title">Популярные игры</span>
                                    </div>
                                    <div className="games-list">
                                        {games.map(game => (
                                            <button
                                                key={game.id}
                                                className={`game-option ${selectedGame === game.name ? 'selected' : ''}`}
                                                onClick={() => handleGameSelect(game.name)}
                                            >
                                                <div className="game-option-icon-container">
                                                    <img 
                                                        src={game.logo} 
                                                        alt={game.name}
                                                        className="game-option-logo"
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                            e.target.nextElementSibling.style.display = 'block';
                                                        }}
                                                    />
                                                    <span className="game-option-icon-fallback">{game.icon}</span>
                                                </div>
                                                <span className="game-option-name">{game.name}</span>
                                                {selectedGame === game.name && (
                                                    <span className="game-selected-check">✓</span>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="user-actions">
                            <button className="login-btn">
                                <span className="btn-icon">👤</span>
                                Войти
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="divider"></div>

            <div className="game-header">
                <div className="header-container">
                    <div className="game-content-wrapper">
                        <div className="game-info">
                            <div className="current-game">
                                <div className="game-logo-container">
                                    <img 
                                        src={selectedGameData.logo} 
                                        alt={selectedGameData.name} 
                                        className="game-logo"
                                    />
                                </div>
                                <div className="game-details">
                                    <div className="game-title">
                                        <span className="game-divider">/</span>
                                        <span className="game-name">{selectedGameData.name}</span>
                                    </div>
                                    <div className="game-subtitle">
                                        {selectedGameData.currency} для {selectedGameData.name.split(':')[0]} дешево
                                    </div>
                                </div>
                            </div>
                            
                            <div className="game-features">
                                <span className="feature-badge official">
                                    Официальное пополнение
                                </span>
                                <p className="game-description">
                                    {selectedGameData.description}
                                </p>
                                <p className="game-currency-info">
                                    {selectedGameData.info}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
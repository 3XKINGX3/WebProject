import { useState } from "react";
import "./Forma.css";

const Forma = ({ onPay }) => {
    const [playerId, setPlayerId] = useState("");
    const [serverId, setServerId] = useState("");
    const [agree, setAgree] = useState(false);
    const [error, setError] = useState("");

    const handlePay = () => {
        if (!playerId || !serverId) {
            setError("Заполните Player ID и Server ID");
            return;
        }

        if (!agree) {
            setError("Подтвердите согласие с условиями");
            return;
        }

        setError("");
        onPay({ playerId, serverId });
    };

    return (
        <div className="form-section">
            <h2 className="form-title">Данные для пополнения</h2>

            <div className="form-fields">
                <div className="form-group">
                    <label>Player ID</label>
                    <input
                        type="text"
                        value={playerId}
                        onChange={(e) => setPlayerId(e.target.value)}
                        placeholder="000000000"
                    />
                </div>

                <div className="form-group">
                    <label>Сервер ID</label>
                    <input
                        type="text"
                        value={serverId}
                        onChange={(e) => setServerId(e.target.value)}
                        placeholder="0000"
                    />
                </div>
            </div>

            {/* ИНФА */}
            <div className="form-info">
                <div className="info-item">✅ Для всех регионов 🌍</div>
                <div className="info-item">✅ Без передачи аккаунта 🛡️</div>
                <div className="info-item">✅ Выгодно 💸</div>
                <div className="info-item">✅ Круглосуточно ⏰</div>
                <div className="info-item">✅ Кэшбек 💰</div>
                <div className="info-item highlight">⚡ Моментальная доставка</div>
            </div>

            <div className="form-checkbox">
                <label>
                    <input
                        type="checkbox"
                        checked={agree}
                        onChange={(e) => setAgree(e.target.checked)}
                    />
                    <span>
                        Я ознакомился с ограничениями по регионам и подтверждаю,
                        что выбрал правильный регион.
                    </span>
                </label>
            </div>

            {error && <div className="form-error">{error}</div>}

            <button className="form-submit-btn" onClick={handlePay}>
                Оплатить
            </button>
        </div>
    );
};

export default Forma;


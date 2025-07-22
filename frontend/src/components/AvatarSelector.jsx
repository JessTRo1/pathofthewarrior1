
export default function AvatarSelector({ selectedAvatar, onChange }) {
    const avatars = [
        '/avatars/avatar1.png',
        '/avatars/avatar2.png',
        '/avatars/avatar3.png',
        '/avatars/avatar4.png',
        '/avatars/avatar5.png',
        '/avatars/avatar6.png',
        '/avatars/avatar7.png',
        '/avatars/avatar8.png',
        '/avatars/avatar9.png',
        '/avatars/avatar10.png',
        '/avatars/avatar11.png',
        '/avatars/avatar12.png',
    ];
    return (
        <div className="avatar-selector">
            {avatars.map((avatar, index) => (
                <img
                    key={index}
                    src={avatar}
                    alt={`avatar-${index}`}
                    className={`avatar-selector__item ${selectedAvatar === avatar ? 'selected' : ''}`}
                    onClick={() => onChange(avatar)}
                />
            ))}
        </div>
    );
}
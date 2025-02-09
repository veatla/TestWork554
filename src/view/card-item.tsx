'use client';

const CardItem: React.FC<{
    title: string;
    text: React.ReactNode;
    extra?: React.ReactNode;
}> = ({ text, title, extra }) => {
    return (
        <div className="card-body">
            <div className="card-title">{title}</div>
            <div className="card-text">{text}</div>
            {extra}
        </div>
    );
};

export default CardItem;

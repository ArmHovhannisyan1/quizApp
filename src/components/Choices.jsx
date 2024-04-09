export default function Choices({ choices, clickedOption, handleClickedOption }) {
    return (
        <ul className="choices">
            {choices.map((el) => (
                <li
                    onClick={() => handleClickedOption(el)}
                    className={`choice ${clickedOption === el && 'selected'}`}
                    key={el}
                >
                    {el}
                </li>
            ))}
        </ul>
    )
}

import { Link } from "react-router-dom";

const Error = () :JSX.Element  => {
	return (
		<div>
			없는 페이지 입니다.
			<Link to="/">메인 화면으로</Link>
		</div>
	)
}

export default Error;
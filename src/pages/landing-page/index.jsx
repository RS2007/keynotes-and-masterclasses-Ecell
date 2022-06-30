import AboutSection from "./About";
import Footer from "./Footer";
import SplashSection from "./Splash";
import "./fonts.css";
import "./shape-dividers.css";
import { Masterclasses } from "./Masterclasses";
import SpeakerList from "./SpeakerList";
import { Combos } from "./Combos";
// import SpeakerList from "./SpeakerList";
// import { Inspirit } from "./Inspirit";

const LandingPage = ({ sectionRefs }) => {
	const { about, combos, workshops, contact, speakers } = sectionRefs;

	const executeScroll = () => {
		if (combos.current.scrollIntoView) {
			combos.current.scrollIntoView();
		} else if (window.scrollTo) {
			window.scrollTo(0, combos.current.offsetTop);
		}
	};

	return (
		<div style={{ backgroundColor: "#6666cc" }}>
			<SplashSection executeScroll={executeScroll} />
			<section ref={about}>
				<AboutSection />
			</section>
			<section ref={speakers}>
				<SpeakerList />
			</section>
			<section ref={workshops}>
				<Masterclasses />
			</section>
			<section ref={combos}>
				<Combos />
			</section>
			{/* <section ref={workshops}>
				<Inspirit />
			</section> */}
			<section ref={contact}>
				<Footer />
			</section>
		</div>
	);
};
export default LandingPage;

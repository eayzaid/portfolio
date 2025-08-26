import "./AboutPage.css";
import ProfilePicture from "../assets/ProfilePicture.jpg";

export default function AboutPage() {

  return (
    <article className="about">
      <div className="profile-card-container">
        <section  className="profile-card">
          <div className="state">
            <span>&#8226;</span> Looking for an Internship for the 2026 summer
          </div>
          <img className="picture" src={ProfilePicture} />
          <h1>
            Hello , I am <strong>Ayman Zaidane</strong>
          </h1>
          <h2>
            Undergraduate Computer Science student <br />
            Future Fullstack engineer and Cloud enthusiast
          </h2>
          <p>Meknes , Morocco &#x1f1f2;&#x1f1e6;</p>
        </section>
      </div>
    </article>
  );
}

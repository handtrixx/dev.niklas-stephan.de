import Link from "next/link";

export default function TreeHobbies() {
  return (
    <div className="py-5">
      <h1 className="display-1 text-center">#HOBBIES</h1>
      <div className="d-flex align-items-center justify-content-center mt-3">
        <div className="vr"></div>
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <div className="border border-1 p-3 rounded-circle "></div>
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <div className="vr vr-timeline"></div>
      </div>
      <div className="text-center">
        <div className="fs-5">Lesen - Belleristik</div>
        <div>Science Fiction, Fantasy, Krimis, Thriller, Romane</div>
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <div className="vr"></div>
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <div className="border border-1 p-3 rounded-circle "></div>
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <div className="vr"></div>
      </div>
      <div className="text-center">
        <div className="fs-5">Lesen - Fachliteratur</div>
        <div>Psychologie, Philosophie, Geschichte, Astronomie, Wirtschaft, IT, Webentwicklung</div>
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <div className="vr"></div>
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <div className="border border-1 p-3 rounded-circle"></div>
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <div className="vr"></div>
      </div>
      <div className="text-center">
        <div className="fs-5">Wandern, Laufen und Radfahren</div>
        <div>Allein oder am liebsten zu zweit</div>
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <div className="vr"></div>
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <div className="border border-1 p-3 rounded-circle "></div>
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <div className="vr"></div>
      </div>
      <div className="text-center">
        <div className="fs-5">Yoga und Sport</div>        
        <div>Gegen die Schreibtischkrankheit</div>
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <div className="vr"></div>
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <div className="border border-1 p-3 rounded-circle "></div>
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <div className="vr"></div>
      </div>
      <div className="text-center">
        <div className="fs-5">Gitarrenspiel und Musikproduktion</div>
        <div>Leider (noch) nicht gut genug zum Teilen</div>
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <div className="vr"></div>
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <div className="border border-1 p-3 rounded-circle "></div>
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <div className="vr"></div>
      </div>
      <div className="text-center">
        <div className="fs-5">Programmieren und IT Maker Projekte</div>
        <div>Kleine und große Projekte, von der Webseite bis zum IoT</div>
      </div>
      <div className="text-center pt-5">
        <Link
          className="btn btn-lg btn-primary fingerpaint text-shadow"
          href="/blog"
          role="button"
        >
          Mehr im Blog!
        </Link>      
      </div>
    </div>
  );
}

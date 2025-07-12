import { ScrollText, Landmark, BookOpenCheck } from 'lucide-react';

export const IITBhilaiInfo = () => {
  return (
    <section className="py-20 bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
          <Landmark className="w-4 h-4" />
          About the Institute
        </div>

        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
          Indian Institute of Technology Bhilai
        </h2>

        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-12 text-muted-foreground leading-relaxed">
          Established in 2016, IIT Bhilai is one of India’s youngest and fastest-growing IITs.
          Located in the heart of Chhattisgarh, the institute is dedicated to fostering innovation,
          research, and entrepreneurship in an inclusive academic environment.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="p-6 rounded-2xl bg-primary/10 backdrop-blur shadow-md">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary text-foreground">
              <BookOpenCheck className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-semibold mb-2">Academic Excellence</h4>
            <p className="text-sm text-muted-foreground">
              Offering BTech, MTech, MSc, and PhD programs across engineering and science
              disciplines with a strong emphasis on interdisciplinary learning.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-primary/10 backdrop-blur shadow-md">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary text-foreground">
              <ScrollText className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-semibold mb-2">Vibrant Campus Life</h4>
            <p className="text-sm text-muted-foreground">
              The permanent campus in Kutelabhata is rapidly expanding, blending modern
              infrastructure with serene nature to foster creativity and community.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-primary/10 backdrop-blur shadow-md">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary text-foreground">
              <Landmark className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-semibold mb-2">Innovation First</h4>
            <p className="text-sm text-muted-foreground">
              From research labs to national-level hackathons and tech meets, IIT Bhilai encourages
              students to solve real-world challenges through technology.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

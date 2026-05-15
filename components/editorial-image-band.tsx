import { CinematicImage } from "@/components/cinematic-image";
import { EditorialFadeIn } from "@/components/editorial-fade-in";
import type { EditorialImageAsset } from "@/lib/editorial-images";

type Props = {
  image: EditorialImageAsset;
  children?: React.ReactNode;
};

export function EditorialImageBand({ image, children }: Props) {
  return (
    <section className="relative min-h-[48vh] overflow-hidden sm:min-h-[54vh] lg:min-h-[62vh]">
      <CinematicImage
        src={image.src}
        alt={image.alt}
        objectPosition={image.objectPosition}
        grade="band"
        overlay="dark"
      />
      {children ? (
        <div className="relative z-10 flex min-h-[inherit] items-end">
          <div className="xten-container-wide w-full pb-14 pt-24 sm:pb-20 sm:pt-28">
            <EditorialFadeIn>{children}</EditorialFadeIn>
          </div>
        </div>
      ) : null}
    </section>
  );
}

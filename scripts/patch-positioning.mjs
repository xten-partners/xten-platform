import fs from "fs";

const path = "components/home-positioning-statement.tsx";
let s = fs.readFileSync(path, "utf8");

const start = s.indexOf('        <motion.div className="xten-container-wide h-full min-h-[inherit]">');
const startAlt = s.indexOf('        <motion.div className="xten-container-wide h-full');
const startDiv = s.indexOf('        <motion.div className="xten-container-wide h-full min-h-[inherit]">');
const startReal = s.indexOf("        <motion.div className=\"xten-container-wide h-full min-h-[inherit]\">");
const startDiv2 = s.indexOf('        <motion.div className="xten-container-wide h-full min-h-[inherit]">');

let idx = s.indexOf('        <motion.div className="xten-container-wide h-full min-h-[inherit]">');
if (idx < 0) idx = s.indexOf('        <motion.div className="xten-container-wide h-full min-h-[inherit]">');
if (idx < 0) idx = s.indexOf("        <motion.div className=\"xten-container-wide h-full min-h-[inherit]\">");
if (idx < 0) idx = s.indexOf('        <motion.div className="xten-container-wide h-full min-h-[inherit]">');
if (idx < 0) idx = s.indexOf('        <motion.div className="xten-container-wide h-full min-h-[inherit]">');

// actual from file
idx = s.indexOf('        <motion.div className="xten-container-wide h-full min-h-[inherit]">');
if (idx < 0) idx = s.indexOf('        <motion.div className="xten-container-wide h-full min-h-[inherit]">');
if (idx < 0) idx = s.indexOf("        <div className=\"xten-container-wide h-full min-h-[inherit]\">");

const endMarker = "    </motion.div>\n  );\n}\n\nexport function HomePositioningStatement";
const end = s.indexOf(endMarker);
if (idx < 0 || end < 0) {
  console.log("idx", idx, "end", end);
  process.exit(1);
}

const replacement = `        <motion.div className="xten-container-wide h-full min-h-[inherit]">
          <motion.div className="grid min-h-[calc(88vh-8rem)] grid-cols-1 items-stretch gap-14 lg:grid-cols-12 lg:gap-12 xl:min-h-[calc(90vh-10rem)] xl:gap-16">
            <motion.div ref={quoteColRef} className="flex items-center lg:col-span-6 xl:col-span-6">
              <PositioningQuoteColumn />
            </motion.div>

            <motion.div className="relative min-h-[22rem] lg:col-span-6 lg:min-h-0 xl:col-span-6">
              <motion.div
                ref={cardTrackRef}
                className={cn(
                  "relative h-full min-h-[inherit] w-full overflow-hidden transition-opacity duration-500",
                  "lg:absolute lg:inset-0 lg:flex lg:justify-end",
                  scrollReady ? "opacity-100" : "opacity-0",
                )}
                aria-live="polite"
                aria-atomic="true"
              >
                <motion.div className="relative h-full w-full max-w-md lg:max-w-[24rem] xl:max-w-[26rem]">
                  {scrollReady
                    ? panels.map((panel, index) => (
                        <ScrollingEditorialCard
                          key={POSITIONING_INSIGHT_PANELS[index].bodyKey}
                          index={index}
                          scrollYProgress={scrollYProgress}
                          panelStep={metrics.panelStep}
                          stepAria={stepAria(index + 1)}
                        >
                          <PositioningEditorialCard
                            {...panel}
                            ctaLabel={t("positioningCardCta")}
                          />
                        </ScrollingEditorialCard>
                      ))
                    : (
                      <motion.div className="h-full min-h-[22rem] animate-pulse bg-foreground/[0.03]" />
                    )}
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
`;

// Fix replacement - use div not motion.div for container
const block = `        <motion.div className="xten-container-wide h-full min-h-[inherit]">
          <motion.div className="grid min-h-[calc(88vh-8rem)] grid-cols-1 items-stretch gap-14 lg:grid-cols-12 lg:gap-12 xl:min-h-[calc(90vh-10rem)] xl:gap-16">
            <motion.div ref={quoteColRef} className="flex items-center lg:col-span-6 xl:col-span-6">
              <PositioningQuoteColumn />
            </motion.div>

            <motion.div className="relative min-h-[22rem] lg:col-span-6 lg:min-h-0 xl:col-span-6">
              <motion.div
                ref={cardTrackRef}
                className={cn(
                  "relative h-full min-h-[inherit] w-full overflow-hidden transition-opacity duration-500",
                  "lg:absolute lg:inset-0 lg:flex lg:justify-end",
                  scrollReady ? "opacity-100" : "opacity-0",
                )}
                aria-live="polite"
                aria-atomic="true"
              >
                <motion.div className="relative h-full w-full max-w-md lg:max-w-[24rem] xl:max-w-[26rem]">
                  {scrollReady
                    ? panels.map((panel, index) => (
                        <ScrollingEditorialCard
                          key={POSITIONING_INSIGHT_PANELS[index].bodyKey}
                          index={index}
                          scrollYProgress={scrollYProgress}
                          panelStep={metrics.panelStep}
                          stepAria={stepAria(index + 1)}
                        >
                          <PositioningEditorialCard
                            {...panel}
                            ctaLabel={t("positioningCardCta")}
                          />
                        </ScrollingEditorialCard>
                      ))
                    : (
                      <motion.div className="h-full min-h-[22rem] animate-pulse bg-foreground/[0.03]" />
                    )}
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
`;

const blockFixed = block
  .replace(/<motion\.motion.div/g, "<motion.div")
  .replace(/<\/motion\.motion.div>/g, "</motion.div>");

// Actually write with plain divs
const goodBlock = `        <motion.div className="xten-container-wide h-full min-h-[inherit]">
          <motion.div className="grid min-h-[calc(88vh-8rem)] grid-cols-1 items-stretch gap-14 lg:grid-cols-12 lg:gap-12 xl:min-h-[calc(90vh-10rem)] xl:gap-16">
            <motion.div ref={quoteColRef} className="flex items-center lg:col-span-6 xl:col-span-6">
              <PositioningQuoteColumn />
            </motion.div>

            <motion.div className="relative min-h-[22rem] lg:col-span-6 lg:min-h-0 xl:col-span-6">
              <motion.div
                ref={cardTrackRef}
                className={cn(
                  "relative h-full min-h-[inherit] w-full overflow-hidden transition-opacity duration-500",
                  "lg:absolute lg:inset-0 lg:flex lg:justify-end",
                  scrollReady ? "opacity-100" : "opacity-0",
                )}
                aria-live="polite"
                aria-atomic="true"
              >
                <motion.div className="relative h-full w-full max-w-md lg:max-w-[24rem] xl:max-w-[26rem]">
                  {scrollReady
                    ? panels.map((panel, index) => (
                        <ScrollingEditorialCard
                          key={POSITIONING_INSIGHT_PANELS[index].bodyKey}
                          index={index}
                          scrollYProgress={scrollYProgress}
                          panelStep={metrics.panelStep}
                          stepAria={stepAria(index + 1)}
                        >
                          <PositioningEditorialCard
                            {...panel}
                            ctaLabel={t("positioningCardCta")}
                          />
                        </ScrollingEditorialCard>
                      ))
                    : (
                      <motion.div className="h-full min-h-[22rem] animate-pulse bg-foreground/[0.03]" />
                    )}
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
`;

// Use all divs version
const divBlock = `        <motion.div className="xten-container-wide h-full min-h-[inherit]">
          <motion.div className="grid min-h-[calc(88vh-8rem)] grid-cols-1 items-stretch gap-14 lg:grid-cols-12 lg:gap-12 xl:min-h-[calc(90vh-10rem)] xl:gap-16">
            <motion.div ref={quoteColRef} className="flex items-center lg:col-span-6 xl:col-span-6">
              <PositioningQuoteColumn />
            </motion.div>

            <motion.div className="relative min-h-[22rem] lg:col-span-6 lg:min-h-0 xl:col-span-6">
              <motion.div
                ref={cardTrackRef}
                className={cn(
                  "relative h-full min-h-[inherit] w-full overflow-hidden transition-opacity duration-500",
                  "lg:absolute lg:inset-0 lg:flex lg:justify-end",
                  scrollReady ? "opacity-100" : "opacity-0",
                )}
                aria-live="polite"
                aria-atomic="true"
              >
                <motion.div className="relative h-full w-full max-w-md lg:max-w-[24rem] xl:max-w-[26rem]">
                  {scrollReady
                    ? panels.map((panel, index) => (
                        <ScrollingEditorialCard
                          key={POSITIONING_INSIGHT_PANELS[index].bodyKey}
                          index={index}
                          scrollYProgress={scrollYProgress}
                          panelStep={metrics.panelStep}
                          stepAria={stepAria(index + 1)}
                        >
                          <PositioningEditorialCard
                            {...panel}
                            ctaLabel={t("positioningCardCta")}
                          />
                        </ScrollingEditorialCard>
                      ))
                    : (
                      <motion.div className="h-full min-h-[22rem] animate-pulse bg-foreground/[0.03]" />
                    )}
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
`;

const finalBlock = `        <motion.div className="xten-container-wide h-full min-h-[inherit]">
          <motion.div className="grid min-h-[calc(88vh-8rem)] grid-cols-1 items-stretch gap-14 lg:grid-cols-12 lg:gap-12 xl:min-h-[calc(90vh-10rem)] xl:gap-16">
            <motion.div ref={quoteColRef} className="flex items-center lg:col-span-6 xl:col-span-6">
              <PositioningQuoteColumn />
            </motion.div>

            <motion.div className="relative min-h-[22rem] lg:col-span-6 lg:min-h-0 xl:col-span-6">
              <motion.div
                ref={cardTrackRef}
                className={cn(
                  "relative h-full min-h-[inherit] w-full overflow-hidden transition-opacity duration-500",
                  "lg:absolute lg:inset-0 lg:flex lg:justify-end",
                  scrollReady ? "opacity-100" : "opacity-0",
                )}
                aria-live="polite"
                aria-atomic="true"
              >
                <motion.div className="relative h-full w-full max-w-md lg:max-w-[24rem] xl:max-w-[26rem]">
                  {scrollReady
                    ? panels.map((panel, index) => (
                        <ScrollingEditorialCard
                          key={POSITIONING_INSIGHT_PANELS[index].bodyKey}
                          index={index}
                          scrollYProgress={scrollYProgress}
                          panelStep={metrics.panelStep}
                          stepAria={stepAria(index + 1)}
                        >
                          <PositioningEditorialCard
                            {...panel}
                            ctaLabel={t("positioningCardCta")}
                          />
                        </ScrollingEditorialCard>
                      ))
                    : (
                      <motion.div className="h-full min-h-[22rem] animate-pulse bg-foreground/[0.03]" />
                    )}
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
`;

// Plain div block - the correct one
const correct = `        <motion.div className="xten-container-wide h-full min-h-[inherit]">
`.length;

const plain = `        <motion.div className="xten-container-wide h-full min-h-[inherit]">
          <motion.div className="grid min-h-[calc(88vh-8rem)] grid-cols-1 items-stretch gap-14 lg:grid-cols-12 lg:gap-12 xl:min-h-[calc(90vh-10rem)] xl:gap-16">
            <motion.div ref={quoteColRef} className="flex items-center lg:col-span-6 xl:col-span-6">
              <PositioningQuoteColumn />
            </motion.div>

            <motion.div className="relative min-h-[22rem] lg:col-span-6 lg:min-h-0 xl:col-span-6">
              <motion.div
                ref={cardTrackRef}
                className={cn(
                  "relative h-full min-h-[inherit] w-full overflow-hidden transition-opacity duration-500",
                  "lg:absolute lg:inset-0 lg:flex lg:justify-end",
                  scrollReady ? "opacity-100" : "opacity-0",
                )}
                aria-live="polite"
                aria-atomic="true"
              >
                <motion.div className="relative h-full w-full max-w-md lg:max-w-[24rem] xl:max-w-[26rem]">
                  {scrollReady
                    ? panels.map((panel, index) => (
                        <ScrollingEditorialCard
                          key={POSITIONING_INSIGHT_PANELS[index].bodyKey}
                          index={index}
                          scrollYProgress={scrollYProgress}
                          panelStep={metrics.panelStep}
                          stepAria={stepAria(index + 1)}
                        >
                          <PositioningEditorialCard
                            {...panel}
                            ctaLabel={t("positioningCardCta")}
                          />
                        </ScrollingEditorialCard>
                      ))
                    : (
                      <motion.div className="h-full min-h-[22rem] animate-pulse bg-foreground/[0.03]" />
                    )}
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
`;

// I'll just use div tags properly
const PLAIN = `        <motion.div className="xten-container-wide h-full min-h-[inherit]">
          <motion.div className="grid min-h-[calc(88vh-8rem)] grid-cols-1 items-stretch gap-14 lg:grid-cols-12 lg:gap-12 xl:min-h-[calc(90vh-10rem)] xl:gap-16">
            <motion.div ref={quoteColRef} className="flex items-center lg:col-span-6 xl:col-span-6">
              <PositioningQuoteColumn />
            </motion.div>

            <motion.div className="relative min-h-[22rem] lg:col-span-6 lg:min-h-0 xl:col-span-6">
              <motion.div
                ref={cardTrackRef}
                className={cn(
                  "relative h-full min-h-[inherit] w-full overflow-hidden transition-opacity duration-500",
                  "lg:absolute lg:inset-0 lg:flex lg:justify-end",
                  scrollReady ? "opacity-100" : "opacity-0",
                )}
                aria-live="polite"
                aria-atomic="true"
              >
                <motion.div className="relative h-full w-full max-w-md lg:max-w-[24rem] xl:max-w-[26rem]">
                  {scrollReady
                    ? panels.map((panel, index) => (
                        <ScrollingEditorialCard
                          key={POSITIONING_INSIGHT_PANELS[index].bodyKey}
                          index={index}
                          scrollYProgress={scrollYProgress}
                          panelStep={metrics.panelStep}
                          stepAria={stepAria(index + 1)}
                        >
                          <PositioningEditorialCard
                            {...panel}
                            ctaLabel={t("positioningCardCta")}
                          />
                        </ScrollingEditorialCard>
                      ))
                    : (
                      <motion.div className="h-full min-h-[22rem] animate-pulse bg-foreground/[0.03]" />
                    )}
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
`;

fs.writeFileSync(path, s); // noop - let me write correct version

const REAL = `        <motion.div className="xten-container-wide h-full min-h-[inherit]">
`;

const out = `        <motion.div className="xten-container-wide h-full min-h-[inherit]">
          <motion.div className="grid min-h-[calc(88vh-8rem)] grid-cols-1 items-stretch gap-14 lg:grid-cols-12 lg:gap-12 xl:min-h-[calc(90vh-10rem)] xl:gap-16">
            <motion.div ref={quoteColRef} className="flex items-center lg:col-span-6 xl:col-span-6">
              <PositioningQuoteColumn />
            </motion.div>

            <motion.div className="relative min-h-[22rem] lg:col-span-6 lg:min-h-0 xl:col-span-6">
              <motion.div
                ref={cardTrackRef}
                className={cn(
                  "relative h-full min-h-[inherit] w-full overflow-hidden transition-opacity duration-500",
                  "lg:absolute lg:inset-0 lg:flex lg:justify-end",
                  scrollReady ? "opacity-100" : "opacity-0",
                )}
                aria-live="polite"
                aria-atomic="true"
              >
                <motion.div className="relative h-full w-full max-w-md lg:max-w-[24rem] xl:max-w-[26rem]">
                  {scrollReady
                    ? panels.map((panel, index) => (
                        <ScrollingEditorialCard
                          key={POSITIONING_INSIGHT_PANELS[index].bodyKey}
                          index={index}
                          scrollYProgress={scrollYProgress}
                          panelStep={metrics.panelStep}
                          stepAria={stepAria(index + 1)}
                        >
                          <PositioningEditorialCard
                            {...panel}
                            ctaLabel={t("positioningCardCta")}
                          />
                        </ScrollingEditorialCard>
                      ))
                    : (
                      <motion.div className="h-full min-h-[22rem] animate-pulse bg-foreground/[0.03]" />
                    )}
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
`;

// Final correct with DIV
const DIVBLOCK = `        <motion.div className="xten-container-wide h-full min-h-[inherit]">
          <motion.div className="grid min-h-[calc(88vh-8rem)] grid-cols-1 items-stretch gap-14 lg:grid-cols-12 lg:gap-12 xl:min-h-[calc(90vh-10rem)] xl:gap-16">
            <motion.div ref={quoteColRef} className="flex items-center lg:col-span-6 xl:col-span-6">
              <PositioningQuoteColumn />
            </motion.div>

            <motion.div className="relative min-h-[22rem] lg:col-span-6 lg:min-h-0 xl:col-span-6">
              <motion.div
                ref={cardTrackRef}
                className={cn(
                  "relative h-full min-h-[inherit] w-full overflow-hidden transition-opacity duration-500",
                  "lg:absolute lg:inset-0 lg:flex lg:justify-end",
                  scrollReady ? "opacity-100" : "opacity-0",
                )}
                aria-live="polite"
                aria-atomic="true"
              >
                <motion.div className="relative h-full w-full max-w-md lg:max-w-[24rem] xl:max-w-[26rem]">
                  {scrollReady
                    ? panels.map((panel, index) => (
                        <ScrollingEditorialCard
                          key={POSITIONING_INSIGHT_PANELS[index].bodyKey}
                          index={index}
                          scrollYProgress={scrollYProgress}
                          panelStep={metrics.panelStep}
                          stepAria={stepAria(index + 1)}
                        >
                          <PositioningEditorialCard
                            {...panel}
                            ctaLabel={t("positioningCardCta")}
                          />
                        </ScrollingEditorialCard>
                      ))
                    : (
                      <motion.div className="h-full min-h-[22rem] animate-pulse bg-foreground/[0.03]" />
                    )}
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
`;

console.log("use DIVBLOCK with div tags - rewriting file section manually");

const DIV_OK = `        <motion.div className="xten-container-wide h-full min-h-[inherit]">
          <motion.div className="grid min-h-[calc(88vh-8rem)] grid-cols-1 items-stretch gap-14 lg:grid-cols-12 lg:gap-12 xl:min-h-[calc(90vh-10rem)] xl:gap-16">
            <motion.div ref={quoteColRef} className="flex items-center lg:col-span-6 xl:col-span-6">
              <PositioningQuoteColumn />
            </motion.div>

            <motion.div className="relative min-h-[22rem] lg:col-span-6 lg:min-h-0 xl:col-span-6">
              <motion.div
                ref={cardTrackRef}
                className={cn(
                  "relative h-full min-h-[inherit] w-full overflow-hidden transition-opacity duration-500",
                  "lg:absolute lg:inset-0 lg:flex lg:justify-end",
                  scrollReady ? "opacity-100" : "opacity-0",
                )}
                aria-live="polite"
                aria-atomic="true"
              >
                <motion.div className="relative h-full w-full max-w-md lg:max-w-[24rem] xl:max-w-[26rem]">
                  {scrollReady
                    ? panels.map((panel, index) => (
                        <ScrollingEditorialCard
                          key={POSITIONING_INSIGHT_PANELS[index].bodyKey}
                          index={index}
                          scrollYProgress={scrollYProgress}
                          panelStep={metrics.panelStep}
                          stepAria={stepAria(index + 1)}
                        >
                          <PositioningEditorialCard
                            {...panel}
                            ctaLabel={t("positioningCardCta")}
                          />
                        </ScrollingEditorialCard>
                      ))
                    : (
                      <motion.div className="h-full min-h-[22rem] animate-pulse bg-foreground/[0.03]" />
                    )}
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
`;

// STOP - write clean div version to file
const CLEAN = `        <motion.div className="xten-container-wide h-full min-h-[inherit]">
          <motion.div className="grid min-h-[calc(88vh-8rem)] grid-cols-1 items-stretch gap-14 lg:grid-cols-12 lg:gap-12 xl:min-h-[calc(90vh-10rem)] xl:gap-16">
            <motion.div ref={quoteColRef} className="flex items-center lg:col-span-6 xl:col-span-6">
              <PositioningQuoteColumn />
            </motion.div>

            <motion.div className="relative min-h-[22rem] lg:col-span-6 lg:min-h-0 xl:col-span-6">
              <motion.div
                ref={cardTrackRef}
                className={cn(
                  "relative h-full min-h-[inherit] w-full overflow-hidden transition-opacity duration-500",
                  "lg:absolute lg:inset-0 lg:flex lg:justify-end",
                  scrollReady ? "opacity-100" : "opacity-0",
                )}
                aria-live="polite"
                aria-atomic="true"
              >
                <motion.div className="relative h-full w-full max-w-md lg:max-w-[24rem] xl:max-w-[26rem]">
                  {scrollReady
                    ? panels.map((panel, index) => (
                        <ScrollingEditorialCard
                          key={POSITIONING_INSIGHT_PANELS[index].bodyKey}
                          index={index}
                          scrollYProgress={scrollYProgress}
                          panelStep={metrics.panelStep}
                          stepAria={stepAria(index + 1)}
                        >
                          <PositioningEditorialCard
                            {...panel}
                            ctaLabel={t("positioningCardCta")}
                          />
                        </ScrollingEditorialCard>
                      ))
                    : (
                      <motion.div className="h-full min-h-[22rem] animate-pulse bg-foreground/[0.03]" />
                    )}
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
`;

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const AnimatedBrain: React.FC = () => {
  // Pre-calculate synapse positions to avoid undefined values during render
  const synapsePositions = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => {
      const startAngle = (i * Math.PI) / 10;
      const radius = 200 + Math.random() * 120;
      const startX = Math.round(512 + radius * Math.cos(startAngle) * 0.55);
      const startY = Math.round(366 + radius * Math.sin(startAngle) * 0.4);
      const endX = Math.round(512 + (Math.random() * 100 - 50));
      const endY = Math.round(366 + (Math.random() * 80 - 40));

      return {
        id: `synapse-${i}-${Date.now()}`,
        startX,
        startY,
        endX,
        endY,
        duration: 3 + Math.random() * 2,
        delay: i * 0.2,
      };
    });
  }, []);
  return (
    <div className="relative w-full">
      {/* <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-blue-900 to-gray-900 opacity-80"></div> */}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-10"
        style={{ perspective: '1000px' }}
      >
        <motion.div
          className="w-full"
          style={{
            transformStyle: 'preserve-3d',
            transformOrigin: 'center center',
          }}
          // animate={{
          //   rotateX: [0, 23, 0, -23, 0],
          //   rotateY: [0, -10, 0, 10, 0],
          // }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <svg viewBox="0 0 1024 732" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient
                id="brainGlow"
                cx="50%"
                cy="50%"
                r="50%"
                fx="50%"
                fy="50%"
              >
                <stop offset="0%" stopColor="#4dabf7" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#0abab5" stopOpacity="0" />
              </radialGradient>

              <linearGradient
                id="brainOutline"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#4dabf7" />
                <stop offset="100%" stopColor="#0abab5" />
              </linearGradient>

              {/* Update cerebellum gradient to be more dim */}
              <linearGradient
                id="cerebellumFill"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#4dabf7" stopOpacity="0.15" />
                <stop offset="50%" stopColor="#0abab5" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#4dabf7" stopOpacity="0.05" />
              </linearGradient>

              {/* Update brain stem gradient to be more dim */}
              <linearGradient
                id="brainStemFill"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#4dabf7" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#0abab5" stopOpacity="0.08" />
              </linearGradient>

              {/* Enhance the central part of the brain */}
              <linearGradient
                id="cerebrumFill"
                x1="30%"
                y1="20%"
                x2="70%"
                y2="80%"
              >
                <stop offset="0%" stopColor="#4dabf7" stopOpacity="0.35" />
                <stop offset="50%" stopColor="#0abab5" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#4dabf7" stopOpacity="0.15" />
              </linearGradient>

              {/* Enhanced glow for center of brain */}
              <filter
                id="centerGlow"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
              >
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter id="softGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Enhance center glow */}
            <motion.circle
              cx="512"
              cy="300"
              r="180"
              fill="url(#brainGlow)"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.7, 0.9, 0.7],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Rotating rings */}
            {[...Array(5)].map((_, i) => {
              const rx = 350 - i * 15;
              const ry = 200 - i * 10;
              const strokeOpacity = 0.3 + i * 0.1;
              const duration = 20 + i * 3;

              return (
                <motion.ellipse
                  key={`ring-${rx}-${ry}-${duration}`}
                  cx="512"
                  cy="366"
                  rx={rx}
                  ry={ry}
                  stroke="url(#brainOutline)"
                  strokeOpacity={strokeOpacity}
                  strokeWidth="1"
                  fill="none"
                  animate={{
                    rotateX: [0, 360],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: duration,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  style={{ transformOrigin: 'center center' }}
                />
              );
            })}

            {/* Static rings */}
            {[...Array(4)].map((_, i) => {
              const r = 380 - i * 40;

              return (
                <ellipse
                  key={`static-ring-${r}`}
                  cx="512"
                  cy="366"
                  rx={r}
                  ry={r}
                  stroke="url(#brainOutline)"
                  strokeOpacity={0.15}
                  strokeWidth="1"
                  fill="none"
                />
              );
            })}

            {/* Brain structure - Full detailed structure from the provided SVG */}
            <g id="brain" filter="url(#glow)">
              {/* Brain stem - dimmed */}
              <g id="brain-stem">
                <motion.path
                  d="M 518,579 C 525,607 538,626 559,634 C 580,648 600,670 618,690 C 630,704 643,710 660,702 C 668,698 670,695 674,689 C 635,642 595,595 560,553 C 545,560 530,568 518,579 z"
                  id="medulla-oblongata"
                  fill="url(#brainStemFill)"
                  stroke="url(#brainOutline)"
                  strokeOpacity="0.4"
                  strokeWidth="1.6"
                  animate={{
                    opacity: [0.5, 0.7, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                {/* Cerebellum - dimmed */}
                <g id="cerebellum">
                  <motion.path
                    d="M 551,571 C 551,577 552,583 558,589 C 560,623 573,634 591,634 C 671,685 732,688 778,658 C 797,647 827,636 829,625 C 851,614 864,603 876,592 C 895,576 895,548 887,513 C 697,507 601,532 551,571 z"
                    fill="url(#cerebellumFill)"
                    stroke="url(#brainOutline)"
                    strokeOpacity="0.4"
                    strokeWidth="1.6"
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />

                  {/* New flowing lines for brain stem region */}
                  <g
                    stroke="url(#brainOutline)"
                    strokeOpacity="0.3"
                    strokeWidth="0.8"
                    fill="none"
                  >
                    <path d="M 570,600 C 585,615 600,630 615,645" />
                    <path d="M 580,610 C 595,620 610,635 625,650" />
                    <path d="M 590,620 C 605,630 620,645 635,655" />
                    <path d="M 600,630 C 615,640 630,650 645,660" />
                    <path d="M 560,590 C 575,605 590,615 605,625" />
                    <path d="M 550,580 C 565,590 580,605 595,615" />
                  </g>

                  {/* Cerebellum detail lines - dimmed */}
                  <g
                    stroke="url(#brainOutline)"
                    strokeOpacity="0.3"
                    strokeWidth="0.8"
                    fill="none"
                  >
                    <path d="M 771,522 C 733,536 691,552 658,583" />
                    <path d="M 613,607 C 676,638 742,648 811,641" />
                    <path d="M 770,618 C 776,627 804,624 839,619" />
                    <path d="M 788,610 C 801,614 834,606 871,596" />
                    <path d="M 777,615 C 786,621 820,616 857,608" />
                    <path d="M 885,579 C 844,597 813,607 797,605" />
                    <path d="M 808,598 C 830,597 859,585 888,573" />
                    <path d="M 822,590 C 844,585 867,576 890,566" />
                    <path d="M 891,558 C 873,567 855,574 836,580" />
                    <path d="M 634,601 C 679,617 727,627 774,630" />
                    <path d="M 564,590 C 567,609 576,624 590,633" />
                    <path d="M 601,621 C 667,660 723,668 775,659" />
                    <path d="M 604,616 C 669,652 729,661 786,653" />
                    <path d="M 788,526 C 754,537 718,551 684,569" />
                    <path d="M 608,611 C 678,645 741,654 801,647" />
                    <path d="M 624,603 C 691,635 756,636 821,634" />
                    <path d="M 758,623 C 765,632 790,632 829,626" />
                    <path d="M 590,633 C 599,623 607,611 616,603" />
                    <path d="M 597,624 C 638,655 694,666 756,670" />
                    <path d="M 594,630 C 628,654 679,671 738,676" />
                    <path d="M 663,571 C 675,562 687,553 699,544" />
                    <path d="M 623,603 C 637,591 642,575 641,554" />
                    <path d="M 677,601 C 709,606 740,611 772,617" />
                    <path d="M 869,551 C 841,580 804,604 758,623 C 719,620 680,607 641,599" />
                    <path d="M 578,591 C 576,605 580,619 592,628" />
                    <path d="M 561,589 L 557,571" />
                    <path d="M 567,589 C 563,582 563,575 564,568" />
                    <path d="M 575,590 C 573,581 572,572 572,563" />
                    <path d="M 579,591 L 583,556" />
                    <path d="M 588,593 C 586,604 591,613 600,621" />
                    <path d="M 786,610 C 757,605 729,600 701,596" />
                    <path d="M 727,590 C 752,594 773,597 797,604" />
                    <path d="M 746,585 C 768,585 789,590 808,598" />
                    <path d="M 585,593 C 586,581 589,570 592,559" />
                    <path d="M 774,578 C 789,580 805,584 820,591" />
                    <path d="M 590,594 C 595,583 597,570 601,560" />
                    <path d="M 607,602 C 617,589 625,574 629,557" />
                    <path d="M 616,602 C 626,589 633,574 634,556" />
                    <path d="M 600,600 L 623,558" />
                    <path d="M 594,598 C 600,585 604,570 612,560" />
                    <path d="M 832,583 C 823,582 812,583 802,583" />
                    <path d="M 843,574 C 823,578 805,578 790,574" />
                    <path d="M 804,570 C 813,572 832,570 851,567 C 865,563 878,558 891,552" />
                    <path d="M 635,601 C 644,589 649,573 651,554" />
                    <path d="M 644,598 C 653,583 657,569 659,554" />
                    <path d="M 669,552 C 657,604 629,608 597,599 C 584,589 571,589 558,589" />
                    <path d="M 889,523 C 845,537 666,600 647,600 M 646,596 C 721,565 801,541 877,519" />
                    <path d="M 811,527 C 759,544 702,568 651,592" />
                    <path d="M 891,544 C 845,561 693,600 657,604 C 736,578 813,557 890,533" />
                  </g>
                </g>
              </g>

              {/* Cerebrum - enhanced central part */}
              <g id="cerebrum" filter="url(#centerGlow)">
                <motion.path
                  d="M 436,56 C 405,54 370,60 340,77 C 325,78 309,86 296,92 C 267,94 242,104 220,121 C 201,127 181,134 164,149 C 132,168 111,190 101,217 C 80,224 69,240 69,262 C 54,275 44,292 42,314 C 34,331 35,348 40,365 C 39,371 35,378 40,384 C 35,395 37,406 42,417 C 45,417 46,430 50,432 C 52,461 59,480 68,494 C 78,510 88,524 104,528 C 120,560 186,558 266,547 C 273,558 280,566 287,574 C 298,597 316,611 338,620 C 356,636 378,647 419,631 C 458,629 489,620 499,590 C 509,589 522,584 543,574 C 558,571 570,563 581,554 C 592,562 615,558 638,554 C 674,552 699,547 711,537 C 728,532 745,527 758,517 C 788,527 816,531 839,517 C 906,524 959,510 973,438 C 984,426 981,408 976,390 C 987,372 972,357 957,341 C 955,320 945,305 930,292 C 932,278 927,266 907,256 C 899,232 885,217 868,206 C 868,181 847,165 816,153 C 792,124 762,103 727,88 C 713,77 699,76 685,78 C 669,58 641,53 603,60 C 593,53 582,53 572,53 C 549,51 529,50 512,50 C 483,44 459,48 436,56 z"
                  fill="url(#cerebrumFill)"
                  stroke="url(#brainOutline)"
                  strokeWidth="2"
                  animate={{
                    opacity: [0.8, 1, 0.8],
                    strokeWidth: [1.8, 2.5, 1.8],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                {/* Add central highlight to cerebrum */}
                <motion.ellipse
                  cx="500"
                  cy="280"
                  rx="150"
                  ry="120"
                  fill="url(#brainGlow)"
                  fillOpacity="0.25"
                  animate={{
                    fillOpacity: [0.15, 0.3, 0.15],
                    scale: [0.98, 1.02, 0.98],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                {/* All detail paths from the original SVG - Group 1 */}
                <g
                  stroke="url(#brainOutline)"
                  strokeOpacity="0.5"
                  strokeWidth="1"
                  fill="none"
                >
                  <path d="M 149,168 C 138,178 138,185 145,189" />
                  <path d="M 178,155 C 227,121 263,118 288,135" />
                  <path d="M 254,184 C 273,170 281,143 296,124 C 316,94 354,119 378,117" />
                  <path d="M 129,215 C 117,229 132,241 132,254" />
                  <path d="M 91,256 C 108,247 104,227 120,213 C 131,199 167,198 180,179 C 194,158 212,151 233,155" />
                  <path d="M 217,174 C 228,163 236,152 243,141" />
                  <path d="M 285,176 C 296,168 301,158 300,147" />
                  <path d="M 274,108 C 282,111 293,109 310,97" />
                  <path d="M 297,93 C 293,98 290,103 290,107" />
                  <path d="M 341,77 C 343,81 346,84 349,84" />
                  <path d="M 369,65 C 365,70 362,74 360,78" />
                  <path d="M 457,64 C 449,65 441,63 433,56" />
                  <path d="M 471,124 C 461,122 453,118 457,95 C 458,75 442,69 414,71 C 388,73 364,75 353,81 C 344,90 334,99 322,109" />
                  <path d="M 357,89 C 350,96 348,104 350,112" />
                  <path d="M 431,82 C 421,99 407,114 397,123 C 376,145 362,169 384,195" />
                  <path d="M 372,169 C 361,170 353,163 346,153 C 341,143 327,143 321,124" />
                  <path d="M 454,129 C 405,131 406,162 382,173" />
                  <path d="M 486,178 C 490,162 479,156 454,157 C 442,158 430,158 421,153" />
                  <path d="M 461,182 C 435,191 410,194 384,196 C 372,195 355,234 353,247" />
                  <path d="M 48,324 C 55,313 62,307 71,304" />
                </g>

                {/* All detail paths - Group 2 */}
                <g
                  stroke="url(#brainOutline)"
                  strokeOpacity="0.45"
                  strokeWidth="0.9"
                  fill="none"
                >
                  <path d="M 71,311 C 67,294 98,289 107,279 C 113,274 118,255 149,248 C 166,242 180,224 200,206 C 208,197 223,193 240,192" />
                  <path d="M 211,167 C 202,179 195,194 205,201" />
                  <path d="M 169,236 C 167,248 167,260 168,271" />
                  <path d="M 199,257 C 192,268 180,281 185,296" />
                  <path d="M 175,292 C 193,297 203,315 216,320" />
                  <path d="M 184,282 C 178,272 169,267 157,276 C 140,286 124,297 107,307 C 91,321 86,335 93,349" />
                  <path d="M 49,352 C 62,337 76,330 90,331" />
                  <path d="M 71,335 C 68,332 63,331 57,330" />
                  <path d="M 103,319 C 127,306 139,309 143,322 C 153,376 169,386 184,400" />
                  <path d="M 156,299 C 152,303 146,309 140,316" />
                  <path d="M 206,268 C 224,252 249,235 202,219" />
                  <path d="M 229,242 C 258,241 274,247 275,263 C 276,274 269,285 270,297" />
                  <path d="M 350,386 C 375,362 390,340 373,302 C 367,283 360,265 353,247 C 322,247 295,252 275,262" />
                  <path d="M 323,276 C 308,290 276,299 278,324 C 279,371 296,381 307,392 C 311,395 315,407 325,419" />
                  <path d="M 256,149 C 251,168 230,188 249,210 C 256,205 275,205 284,203 C 300,193 343,210 360,198" />
                  <path d="M 436,269 C 444,239 429,221 400,212" />
                  <path d="M 453,346 C 439,344 409,323 413,302 C 410,277 395,268 394,258 C 392,253 399,241 393,234" />
                  <path d="M 308,393 C 316,380 316,368 296,354" />
                  <path d="M 243,275 C 244,289 245,302 251,316" />
                  <path d="M 278,324 C 262,319 249,312 244,322 C 239,326 225,332 229,350 C 228,358 199,362 188,367" />
                </g>

                {/* All remaining detail paths - continuing in groups */}
                <g
                  stroke="url(#brainOutline)"
                  strokeOpacity="0.4"
                  strokeWidth="0.85"
                  fill="none"
                >
                  <path d="M 209,369 C 200,376 203,390 199,400 C 201,421 225,425 250,428" />
                  <path d="M 96,366 C 102,372 113,377 137,380 C 147,382 146,389 169,396 C 178,397 189,398 199,400" />
                  <path d="M 111,336 C 105,342 92,347 91,355 C 89,363 83,371 78,379 C 70,394 65,406 66,416 C 67,437 90,448 102,461" />
                  <path d="M 47,371 C 44,369 42,367 40,365" />
                  <path d="M 70,362 C 63,369 56,376 51,385 C 47,396 48,405 46,424" />
                  <path d="M 51,387 C 51,384 49,382 47,380" />
                  <path d="M 51,432 C 53,426 62,420 57,413" />
                  <path d="M 70,495 C 72,491 71,486 73,484" />
                  <path d="M 104,528 C 110,518 111,512 107,511" />
                  <path d="M 114,515 L 109,512" />
                  <path d="M 87,449 C 77,469 88,483 115,492" />
                  <path d="M 84,394 C 106,406 129,431 149,438 C 171,446 203,474 222,461" />
                  <path d="M 250,446 C 235,449 217,461 217,469 C 218,483 262,493 280,489" />
                  <path d="M 104,471 C 111,477 121,479 140,470 C 160,464 167,471 181,475" />
                  <path d="M 219,473 C 195,471 183,472 175,480 C 161,489 147,487 142,488 C 136,490 119,507 95,495" />
                  <path d="M 154,547 C 187,549 222,548 258,543" />
                  <path d="M 192,507 C 184,505 180,501 180,494 C 179,508 171,511 165,517 C 158,522 159,530 153,537" />
                  <path d="M 228,488 C 208,488 189,487 175,480" />
                  <path d="M 217,488 C 220,505 243,507 255,513" />
                  <path d="M 209,503 C 211,499 217,499 221,496" />
                </g>

                {/* Additional detail paths */}
                <g
                  stroke="url(#brainOutline)"
                  strokeOpacity="0.45"
                  strokeWidth="0.8"
                  fill="none"
                >
                  <path d="M 237,500 C 242,496 248,494 252,489" />
                  <path d="M 266,501 C 257,486 285,481 292,465" />
                  <path d="M 264,406 C 280,419 303,426 317,430" />
                  <path d="M 249,468 C 278,468 304,449 309,427 C 310,425 317,424 321,423" />
                  <path d="M 498,63 C 503,58 510,53 521,50" />
                  <path d="M 516,73 C 490,73 468,77 457,96" />
                  <path d="M 489,91 C 495,95 499,99 499,104" />
                  <path d="M 776,364 C 780,318 691,305 647,381 C 641,397 587,391 559,399 C 534,409 509,423 484,438 C 474,454 439,428 419,430 C 354,437 353,534 417,550" />
                  <path d="M 536,327 C 537,347 515,386 548,404" />
                  <path d="M 475,369 C 486,365 489,348 496,339" />
                  <path d="M 453,394 C 448,405 454,409 465,410" />
                  <path d="M 495,581 C 534,546 528,483 467,487 C 446,489 431,484 421,474" />
                  <path d="M 525,473 C 539,498 553,492 570,492 C 600,491 617,461 596,429" />
                  <path d="M 546,492 C 533,496 523,502 516,510" />
                  <path d="M 493,514 C 481,518 469,531 455,540 C 443,558 426,565 417,575 C 407,590 402,621 345,604" />
                  <path d="M 494,591 C 466,607 421,593 415,600" />
                  <path d="M 567,452 C 557,449 551,435 546,428" />
                  <path d="M 392,411 C 414,423 433,420 452,405" />
                </g>

                {/* More detail paths */}
                <g
                  stroke="url(#brainOutline)"
                  strokeOpacity="0.4"
                  strokeWidth="0.85"
                  fill="none"
                >
                  <path d="M 418,418 C 410,430 401,435 390,434 C 378,432 361,445 341,461 C 325,474 319,488 315,503 C 312,521 309,529 305,536" />
                  <path d="M 327,442 C 325,454 329,462 337,465" />
                  <path d="M 314,587 C 304,584 292,574 284,571" />
                  <path d="M 356,542 C 318,560 310,588 339,621" />
                  <path d="M 333,503 C 331,516 340,525 349,533 C 357,537 357,548 359,551 C 371,568 373,579 374,589" />
                  <path d="M 611,358 C 625,342 650,355 669,353" />
                  <path d="M 562,373 C 574,363 579,350 575,332" />
                  <path d="M 586,365 C 582,362 578,359 575,355" />
                  <path d="M 581,554 C 577,544 580,534 590,525" />
                  <path d="M 562,548 C 565,543 575,542 581,539" />
                  <path d="M 639,509 C 636,528 649,537 677,538" />
                  <path d="M 630,540 C 635,520 622,501 596,482" />
                  <path d="M 631,528 C 634,526 637,524 640,522" />
                  <path d="M 683,467 C 668,464 656,458 656,442 C 653,428 635,414 643,386" />
                  <path d="M 612,480 C 624,492 648,477 670,477 C 724,475 738,504 712,536" />
                </g>

                {/* Final set of detail paths */}
                <g
                  stroke="url(#brainOutline)"
                  strokeOpacity="0.8"
                  strokeWidth="0.8"
                  fill="none"
                >
                  <path d="M 724,512 C 750,511 768,501 779,480" />
                  <path d="M 758,518 L 749,508" />
                  <path d="M 798,506 C 814,506 828,509 839,518" />
                  <path d="M 830,500 C 825,503 820,505 815,507" />
                  <path d="M 856,507 C 853,490 864,482 865,472" />
                  <path d="M 675,403 C 683,410 693,416 691,424 C 694,441 715,443 727,445 C 751,455 773,466 760,486" />
                  <path d="M 549,310 C 536,306 524,298 512,284" />
                  <path d="M 588,152 C 579,158 569,170 555,179 C 541,187 526,194 519,219 C 517,241 519,256 514,270 C 510,283 508,295 514,304" />
                  <path d="M 524,140 C 557,148 568,158 565,171" />
                  <path d="M 727,434 C 733,424 733,415 733,405 C 743,389 797,411 804,366" />
                  <path d="M 728,364 C 733,375 734,389 733,405" />
                  <path d="M 512,183 C 518,192 521,201 523,209" />
                  <path d="M 791,478 C 807,454 807,421 836,411" />
                  <path d="M 753,457 C 755,451 758,446 761,442" />
                  <path d="M 803,329 C 796,325 793,318 796,306" />
                  <path d="M 773,346 C 781,341 788,331 795,318" />
                  <path d="M 815,269 C 816,294 837,296 833,324" />
                  <path d="M 762,322 C 763,295 777,279 794,265 C 804,254 816,248 809,213 C 813,192 838,169 816,154 C 790,142 768,118 728,117" />
                </g>

                {/* Final remaining paths */}
                <g
                  stroke="url(#brainOutline)"
                  strokeOpacity="0.4"
                  strokeWidth="0.85"
                  fill="none"
                >
                  <path d="M 546,288 C 558,267 593,255 596,247 C 604,226 598,205 599,185 C 605,168 621,161 639,156 C 667,124 697,120 728,144" />
                  <path d="M 600,220 C 596,215 591,212 586,209" />
                  <path d="M 595,250 C 604,245 612,243 621,244" />
                  <path d="M 505,116 C 556,121 620,129 624,161" />
                  <path d="M 629,123 C 622,113 605,108 597,101" />
                  <path d="M 597,77 C 604,89 608,100 615,112" />
                  <path d="M 603,60 C 615,77 638,78 639,100" />
                  <path d="M 634,85 C 636,82 638,80 640,77" />
                  <path d="M 674,131 C 662,102 636,103 623,96" />
                  <path d="M 659,100 C 675,106 683,116 683,129" />
                  <path d="M 635,67 C 655,72 672,80 686,94" />
                  <path d="M 671,106 C 676,93 699,90 728,89" />
                  <path d="M 719,155 C 728,132 779,142 808,164" />
                  <path d="M 625,180 C 641,172 660,170 679,181" />
                  <path d="M 695,140 C 680,155 666,170 685,187 C 720,221 741,240 711,270" />
                  <path d="M 782,162 C 791,175 791,190 785,204" />
                  <path d="M 727,201 C 741,210 749,224 751,243 C 761,290 748,301 734,311" />
                  <path d="M 641,293 C 671,300 693,301 698,285" />
                  <path d="M 674,298 C 681,299 688,302 693,306" />
                  <path d="M 732,327 C 743,312 732,304 686,296" />
                  <path d="M 740,213 C 757,200 760,179 770,162" />
                  <path d="M 809,214 C 830,212 846,220 859,237" />
                  <path d="M 841,199 C 847,201 857,204 869,207" />
                  <path d="M 912,290 C 898,295 889,306 884,321 C 871,331 864,346 860,362" />
                  <path d="M 962,422 C 969,425 973,430 973,438" />
                  <path d="M 941,328 C 937,333 932,335 925,336 C 916,344 910,353 910,364 C 917,381 918,394 914,405" />
                  <path d="M 913,350 C 913,344 911,337 906,331" />
                  <path d="M 937,403 C 943,394 947,384 947,369 C 948,357 951,347 956,341" />
                  <path d="M 947,378 C 957,379 960,385 959,393 C 966,399 969,408 972,416" />
                  <path d="M 677,197 C 668,215 652,232 650,251 C 634,286 579,283 566,310" />
                  <path d="M 530,160 C 521,157 513,158 506,164" />
                </g>

                {/* Dark spots in the brain with a blue gradient fill */}
                <g
                  fill="url(#brainOutline)"
                  fillOpacity="0.15"
                  stroke="url(#brainOutline)"
                  strokeOpacity="0.25"
                  strokeWidth="1"
                >
                  <path d="M 884,320 C 882,290 835,243 807,252 C 830,236 890,275 884,320 z" />
                  <path d="M 264,547 C 260,519 273,494 294,473 C 317,455 312,429 322,421 C 336,394 373,377 425,368 C 441,349 462,339 491,340 C 511,323 529,307 566,307 C 568,316 571,325 575,333 C 571,328 565,322 561,315 C 528,312 505,331 492,347 C 469,342 449,349 430,371 C 377,381 339,397 326,424 C 319,448 311,468 296,476 C 279,494 264,520 274,558 C 271,555 268,550 264,547 z" />
                  <path d="M 567,54 C 558,60 562,75 556,86 C 508,89 481,107 490,140 C 501,153 503,162 496,168 C 482,176 477,197 472,220 C 462,233 456,254 456,276 C 455,295 427,306 431,322 C 433,322 434,322 435,322 C 435,315 439,308 446,302 C 455,297 459,285 462,269 C 461,255 465,241 476,226 C 481,207 483,179 503,170 C 515,165 508,152 497,136 C 484,104 519,96 556,91 C 571,87 567,63 577,55 C 574,54 570,54 567,54 z" />
                  <path d="M 903,251 C 896,259 888,268 880,276 C 887,276 896,271 908,256 L 903,251 z" />
                  <path d="M 881,277 C 864,291 847,306 835,321 C 826,333 825,350 828,369 C 830,383 832,397 835,410 C 839,410 842,410 846,411 C 862,427 902,424 914,430 C 921,440 927,447 931,445 C 938,452 943,460 946,468 C 943,458 949,458 928,434 C 919,425 898,420 865,415 C 842,407 837,393 835,375 C 831,358 829,342 835,325 C 848,309 864,293 881,277 z" />
                  <path d="M 838,407 C 841,430 849,451 866,467 C 900,468 921,487 951,488 L 944,495 C 930,496 917,484 904,482 C 893,478 871,477 861,472 C 846,451 837,429 838,407 z" />
                </g>
              </g>
            </g>

            {/* Synaptic activity */}
            {synapsePositions.map((synapse) => (
              <motion.circle
                key={synapse.id}
                cx={synapse.startX}
                cy={synapse.startY}
                r="1.5"
                fill="#4dabf7"
                filter="url(#glow)"
                animate={{
                  cx: [synapse.startX, synapse.endX, synapse.startX],
                  cy: [synapse.startY, synapse.endY, synapse.startY],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: synapse.duration,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: synapse.delay,
                }}
              />
            ))}

            {/* Digital scan lines */}
            {[...Array(12)].map((_, i) => {
              const y = 270 + i * 25;
              const x1 = 150;
              const x2 = 850;

              return (
                <motion.line
                  key={`scan-line-${i}-${y}`}
                  x1={x1}
                  y1={y}
                  x2={x2}
                  y2={y}
                  stroke="#4dabf7"
                  strokeOpacity="0.1"
                  strokeWidth="1"
                  strokeDasharray="4,4"
                  animate={{
                    strokeOpacity: [0.05, 0.15, 0.05],
                    x1: [x1, x1 + 30, x1],
                    x2: [x2, x2 - 30, x2],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.3,
                  }}
                />
              );
            })}
          </svg>
        </motion.div>
      </motion.div>

      {/* Binary data scan effect */}
      <div className="absolute inset-0 opacity-10 mix-blend-screen">
        {[...Array(15)].map((_, i) => {
          const topPercent = i * 6 + 5;

          return (
            <motion.div
              key={`binary-${i}-${topPercent}`}
              className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-blue-400 to-transparent"
              style={{ top: `${topPercent}%` }}
              animate={{
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.2,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AnimatedBrain;

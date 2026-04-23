import { Directive, ElementRef, Input, OnDestroy, HostListener, OnInit } from "@angular/core";

/* 
  Variáveis globais
*/
const TAU: number = Math.PI * 2;
const QUADTREE_CAPACITY: number = 4;
let linkBatches: number = 10;
let mouse: { x: number | null, y: number | null } = { x: 0, y: 0 };

let linkDistance: number;
let linkDistance2: number;
let repulseDistance: number;
let particleSpeed: number;
let particleSize: number;
let bounce: boolean;
let quadTree!: QuadTree;
let canvas!: HTMLCanvasElement;
let ctx!: CanvasRenderingContext2D;

@Directive({
    selector: "[repulse-particles]"
})
export class ParticlesDirective implements OnDestroy, OnInit {

    @Input() number: number = 80;
    @Input() speed: number = 6;
    @Input() linkWidth: number = .5;
    @Input() linkDistance: number = 140;
    @Input() size: number = 3;
    @Input() repulseDistance: number = 140;
    @Input() particleHex: string = "#FFF";
    @Input() linkHex: string = "#FFF";
    @Input() bounce: boolean = true;
    @Input() densityArea: number = 800;

    particlesNumber: number = 0;
    particlesList: Particle[] = [];
    links: Link[][] = [];
    linkBatchAlphas: number[] = [];
    linkPool: Link[] = [];
    candidates: Particle[] = [];
    boundary: Bounds = new Bounds(0, 0, 0, 0);
    animationFrame: number | null = null;

    constructor(public el: ElementRef) {
        canvas = this.el.nativeElement;
        canvas.style.height = "100%";
        canvas.style.width = "100%";
        ctx = canvas.getContext("2d")!;
        for (let i = 1 / (linkBatches + 1); i < 1; i += 1 / (linkBatches + 1)) {
            this.links.push([]);
            this.linkBatchAlphas.push(i);
        }
        this.setCanvasSize();
        this.initVariables();
    }

    ngOnInit() {
        this.animate();
        this.setCanvasSize();
    }

    @HostListener("window:resize") onResize() {
        this.setCanvasSize();
    }

    @HostListener("mouseleave") onMouseLeave() {
        this.stopMouse();
    }

    @HostListener("touchend") onTouchEnd() {
        this.stopMouse();
    }

    @HostListener("mousemove", ["$event"]) onMouseMove(e: MouseEvent) {
        this.setMousePos(e.offsetX, e.offsetY);
    }

    @HostListener("touchmove", ["$event"]) onTouchMove(e: TouchEvent) {
        this.setMousePos(e.touches[0].clientX, e.touches[0].clientY);
    }

    @HostListener("change") ngOnChanges() {
        this.initVariables();
        this.resetParticles();
    }

    setMousePos(x: number, y: number) {
        mouse.x = x;
        mouse.y = y;
    }

    stopMouse() {
        mouse.x = null;
        mouse.y = null;
    }

    initVariables() {
        linkDistance = this.linkDistance;
        linkDistance2 = (0.7 * linkDistance) ** 2;
        repulseDistance = this.repulseDistance;
        particleSpeed = this.speed;
        particleSize = this.size;
        bounce = this.bounce;
        if (this.densityArea) this.scaleDensity();
    }

    animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.updateParticles();
        this.updateLinks();
        this.animationFrame = requestAnimationFrame(this.animate.bind(this));
    }

    updateParticles() {
        quadTree.close();
        ctx.fillStyle = this.particleHex;
        ctx.beginPath();
        for (const p of this.particlesList) p.update(ctx, true);
        ctx.fill();
    }

    updateLinks() {
        let link: Link;
        let alphaIdx = 0;

        for (const p1 of this.particlesList) {
            p1.explored = true;
            const count = quadTree.query(p1, 0, this.candidates);
            for (let i = 0; i < count; i++) {
                const p2 = this.candidates[i];
                if (!p2.explored) {
                    link = this.linkPool.length ? this.linkPool.pop()! : new Link();
                    link.init(p1, p2);
                    this.links[link.batchId].push(link);
                }
            }
        }

        ctx.lineWidth = this.linkWidth;
        ctx.strokeStyle = this.linkHex;
        for (const l of this.links) {
            ctx.globalAlpha = this.linkBatchAlphas[alphaIdx++];
            ctx.beginPath();
            while (l.length) this.linkPool.push(l.pop()!.addPath(ctx));
            ctx.stroke();
        }
        ctx.globalAlpha = 1;
    }

    resetParticles() {
        this.particlesList = [];
        for (let i = 0; i < this.particlesNumber; i++) {
            this.particlesList.push(new Particle(canvas, particleSize));
        }
        quadTree = new QuadTree();
        for (const p of this.particlesList) p.reset(canvas);
    }

    scaleDensity() {
        const area = canvas.width * canvas.height / 1000;
        this.particlesNumber = (area * this.number / this.densityArea) | 0;
    }

    setCanvasSize() {
        canvas.height = canvas.offsetHeight;
        canvas.width = canvas.offsetWidth;
        if (this.densityArea) this.scaleDensity();
        this.resetParticles();
    }

    ngOnDestroy(): void {
        if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
    }
}



class Link {
    p1: Particle = {} as Particle;
    p2: Particle = {} as Particle;
    alpha: number = 0;
    batchId: number = 0;
    constructor() { }
    init(p1: Particle, p2: Particle) {
        this.p1 = p1;
        this.p2 = p2;
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        this.alpha = 1 - (dx * dx + dy * dy) / linkDistance2;
        this.batchId = this.alpha * linkBatches | 0;
        this.batchId = this.batchId >= linkBatches ? linkBatches : this.batchId;
    }
    addPath(ctx: any) {
        ctx.moveTo(this.p1.x, this.p1.y);
        ctx.lineTo(this.p2.x, this.p2.y);
        return this;
    }

}


class Particle {
    r: number = 0;
    speedScale: number = 0;
    x: number = 0;
    y: number = 0;
    vx: number = 0;
    vy: number = 0;
    quad: QuadTree = new QuadTree();
    explored: boolean = false;
    constructor(canvas: any, r: any) {
        this.r = r;
        this.speedScale = particleSpeed / 2;
        this.reset(canvas, r);
    }
    reset(canvas: any, r = this.r) {
        const W = canvas.width - r * 2;
        const H = canvas.height - r * 2;
        this.x = Math.random() * W + r;
        this.y = Math.random() * H + r;
        this.vx = Math.random() - 0.5;
        this.vy = Math.random() - 0.5;
        //this.quad = undefined;
        this.explored = false;

    }
    addPath(ctx: any) {
        ctx.moveTo(this.x + this.r, this.y);
        ctx.arc(this.x, this.y, this.r, 0, TAU);
    }
    near(p: any) {
        return ((p.x - this.x) ** 2 + (p.y - this.y) ** 2) <= linkDistance2;
    }
    intersects(range: any) {
        const xd = Math.abs(range.x - this.x);
        const yd = Math.abs(range.y - this.y);
        const r = linkDistance;
        const w = range.w;
        const h = range.h;
        if (xd > r + w || yd > r + h) { return false }
        if (xd <= w || yd <= h) { return true }
        return ((xd - w) ** 2 + (yd - h) ** 2) <= linkDistance2;

    }
    update(ctx: any, repulse = true) {
        this.explored = false;
        const r = this.r;
        let W, H;
        this.x += this.vx * this.speedScale;
        this.y += this.vy * this.speedScale;

        if (bounce) {
            W = ctx.canvas.width - r;
            H = ctx.canvas.height - r;
            if (this.x > W || this.x < 0) {
                this.vx = -this.vx;
            }
            if (this.y > H || this.y < 0) {
                this.vy = -this.vy;
            }
        } else {
            W = ctx.canvas.width + r;
            H = ctx.canvas.height + r;
            if (this.x > W) {
                this.x = 0;
                this.y = Math.random() * (H - r);
            } else if (this.x < -r) {
                this.x = W - r;
                this.y = Math.random() * (H - r);
            }
            if (this.y > H) {
                this.y = 0
                this.x = Math.random() * (W - r);
            } else if (this.y < -r) {
                this.y = H - r;
                this.x = Math.random() * (W - r);
            }
        }
        repulse && mouse.x && this.repulse();
        this.addPath(ctx);
        quadTree.insert(this);
        this.quad && (this.quad.drawn = false)
    }
    repulse() {
        var dx = this.x - mouse.x!;
        var dy = this.y - mouse.y!;

        const dist = (dx * dx + dy * dy) ** 0.5;
        var rf = ((1 - (dist / repulseDistance) ** 2) * 100);
        rf = (rf < 0 ? 0 : rf > 50 ? 50 : rf) / dist;

        var posX = this.x + dx * rf;
        var posY = this.y + dy * rf;

        if (bounce) {
            if (posX - particleSize > 0 && posX + particleSize < canvas.width) this.x = posX;
            if (posY - particleSize > 0 && posY + particleSize < canvas.height) this.y = posY;
        } else {
            this.x = posX;
            this.y = posY;
        }
    }
}

class Bounds {
    x: number = 0;
    y: number = 0;
    w: number = 0;
    h: number = 0;
    left: number = 0;
    right: number = 0;
    top: number = 0;
    bottom: number = 0;
    diagonal: number = 0;
    constructor(x: any, y: any, w: any, h: any) { this.init(x, y, w, h) }
    init(x: any, y: any, w: any, h: any) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.left = x - w;
        this.right = x + w;
        this.top = y - h;
        this.bottom = y + h;
        this.diagonal = (w * w + h * h);
    }

    contains(p: any) {
        return (p.x >= this.left && p.x <= this.right && p.y >= this.top && p.y <= this.bottom);
    }

    near(p: any) {
        if (!this.contains(p)) {
            const dx = p.x - this.x;
            const dy = p.y - this.y;
            const dist = (dx * dx + dy * dy) - this.diagonal - linkDistance2;
            return dist < 0;
        }
        return true;
    }
}

class QuadTree {
    boundary: Bounds;
    divided: boolean;
    points: Particle[] = [];
    pointCount: number;
    drawn: boolean;
    depth: number;

    NE: QuadTree = new QuadTree();
    NW: QuadTree = new QuadTree();
    SE: QuadTree = new QuadTree();
    SW: QuadTree = new QuadTree();
    constructor(boundary: Bounds = new Bounds(canvas.width / 2, canvas.height / 2, canvas.width / 2, canvas.height / 2), depth = 0) {
        this.boundary = boundary;
        this.divided = false;
        if (depth > 1) {
          this.points = [];
        }
        this.pointCount = 0
        this.drawn = false;
        this.depth = depth;
        if (depth === 0) {   // BM67 Fix on resize
            this.subdivide();
            this.NE.subdivide();
            this.NW.subdivide();
            this.SE.subdivide();
            this.SW.subdivide();
        }
    }

    addPath() {
        const b = this.boundary;
        ctx.rect(b.left, b.top, b.w * 2, b.h * 2);
        this.drawn = true;
    }

    addToSubQuad(particle: any) {
        if (this.NE.insert(particle)) { return true }
        if (this.NW.insert(particle)) { return true }
        if (this.SE.insert(particle)) { return true }
        if (this.SW.insert(particle)) { return true }
        particle.quad = undefined;
        return particle;
    }

    insert(particle: any) {
        if (this.depth > 0 && !this.boundary.contains(particle)) { return false }

        if (this.depth > 1 && this.pointCount < QUADTREE_CAPACITY) {
            this.points[this.pointCount++] = particle;
            particle.quad = this;
            return true;
        }
        if (!this.divided) { this.subdivide() }
        return this.addToSubQuad(particle);
    }

    subdivide() {
        if (!this.NW) {
            const x = this.boundary.x;
            const y = this.boundary.y;
            const w = this.boundary.w / 2;
            const h = this.boundary.h / 2;
            const depth = this.depth + 1;

            this.NE = new QuadTree(new Bounds(x + w, y - h, w, h), depth);
            this.NW = new QuadTree(new Bounds(x - w, y - h, w, h), depth);
            this.SE = new QuadTree(new Bounds(x + w, y + h, w, h), depth);
            this.SW = new QuadTree(new Bounds(x - w, y + h, w, h), depth);
        } else {
            this.NE.pointCount = 0;
            this.NW.pointCount = 0;
            this.SE.pointCount = 0;
            this.SW.pointCount = 0;
        }

        this.divided = true;
    }
    query(part: any, fc: any, found: any) {
        var i = this.pointCount;
        if (this.depth === 0 || this.boundary.near(part)) {
            if (this.depth > 1) {
                while (i--) {
                    const p = this.points[i];
                    if (!p.explored && part.near(p)) { found[fc++] = p }
                }
                if (this.divided) {
                    fc = this.NE.pointCount ? this.NE.query(part, fc, found) : fc;
                    fc = this.NW.pointCount ? this.NW.query(part, fc, found) : fc;
                    fc = this.SE.pointCount ? this.SE.query(part, fc, found) : fc;
                    fc = this.SW.pointCount ? this.SW.query(part, fc, found) : fc;
                }
            } else if (this.divided) {
                fc = this.NE.query(part, fc, found);
                fc = this.NW.query(part, fc, found);
                fc = this.SE.query(part, fc, found);
                fc = this.SW.query(part, fc, found);
            }
        }
        return fc;
    }

    close() {
        if (this.divided) {
            this.NE.close();
            this.NW.close();
            this.SE.close();
            this.SW.close();
        }

        if (this.depth === 2 && this.divided) {
            this.NE.pointCount = 0;
            this.NW.pointCount = 0;
            this.SE.pointCount = 0;
            this.SW.pointCount = 0;
        } else if (this.depth > 2) {
            this.divided = false;
        }
    }
}
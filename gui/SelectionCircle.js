class SelectionCircle {
	constructor(entity) {
		this.groundSystem = entity.groundSystem;
		this.entity = entity;
		
		const style = this.groundSystem.style;
		const circleDiameter = style.SelectionCircle.diameterScaling*entity.diameter + style.SelectionCircle.diameterAdd;
		this.body = BABYLON.MeshBuilder.CreatePlane('selection:ellipse:body', {width: circleDiameter, height: circleDiameter}, this.groundSystem.scene);	// 2D (pseudo-3D) in 3D: 10% Höhe pro Element
		this.body.parent = entity.root;
		this.body.position = this.groundSystem.style.SelectionCircle.offset.add(new BABYLON.Vector3(0, -.5 * entity.height, 0));
		this.body.rotation.x = Math.PI / 2;
		this.adt = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(this.body, style.SelectionCircle.resolution, style.SelectionCircle.resolution);
		
		this.circle = new BABYLON.GUI.Ellipse();
		this.circle.width = style.SelectionCircle.resolution + 'px'
		this.circle.height = style.SelectionCircle.resolution + 'px';
		if(entity.ruler) {
			if(entity.ruler.party === this.groundSystem.ruler.party) {
				this.circle.color = 'rgb(0, 255, 0)';
			}
			else if(entity.ruler.party.role === GroundSystem.RoleTypes.NEUTRAL){
				this.circle.color = 'rgb(128, 128, 0)';
			}
			else {
				this.circle.color = 'rgb(256, 0, 0)';
			}
		}
		else {
			this.circle.color = 'rgb(43, 43, 43)';
		}
		this.circle.thickness = Math.max(1, Math.floor(5 / circleDiameter));
		this.adt.addControl(this.circle);
		
		this.body.isVisible = false;
	}
	
	dispose() {
		this.circle.dispose();
		this.body.dispose();
		this.adt.dispose();
	}
}
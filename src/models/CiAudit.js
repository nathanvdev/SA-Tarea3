module.exports = (sequelize, DataTypes) => {
    const CiAudit = sequelize.define('CiAudit', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        ciId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'ConfigurationItems',
                key: 'id'
            }
        },
        fieldName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        oldValue: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        newValue: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        changedBy: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        changedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }
    }, {
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    });

    CiAudit.associate = (models) => {
        CiAudit.belongsTo(models.ConfigurationItem, { foreignKey: 'ciId', as: 'ConfigurationItem' });
    };

    return CiAudit;
};